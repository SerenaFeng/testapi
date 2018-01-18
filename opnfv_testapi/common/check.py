##############################################################################
# Copyright (c) 2017 ZTE Corp
# feng.xiaowei@zte.com.cn
# All rights reserved. This program and the accompanying materials
# are made available under the terms of the Apache License, Version 2.0
# which accompanies this distribution, and is available at
# http://www.apache.org/licenses/LICENSE-2.0
##############################################################################
import functools
import re

from tornado import gen

from opnfv_testapi.common import constants
from opnfv_testapi.common import message
from opnfv_testapi.common import raises
from opnfv_testapi.common.config import CONF
from opnfv_testapi.db import api as dbapi


def is_authorized(method):
    @functools.wraps(method)
    def wrapper(self, *args, **kwargs):
        if CONF.api_authenticate and self.table in ['pods', 'projects', 'testcases', 'scenarios']:
            testapi_id = self.get_secure_cookie(constants.TESTAPI_ID)
            if not testapi_id:
                raises.Unauthorized(message.not_login())
            user_info = yield dbapi.db_find_one('users', {'user': testapi_id})
            if not user_info:
                raises.Unauthorized(message.not_lfid())
            if method.__name__ == "_create":
                kwargs['owner'] = testapi_id
            if self.table in ['projects']:
                query = kwargs.get('query')
                if type(query) is not dict:
                    query_data = query()
                else:
                    if self.json_args is None:
                        query_data = query
                    else:
                        query_data = self.json_args
                group = "opnfv-gerrit-" + query_data['name'] + "-submitters"
                if group not in user_info['groups']:
                    raises.Unauthorized(message.no_permission())
        ret = yield gen.coroutine(method)(self, *args, **kwargs)
        raise gen.Return(ret)
    return wrapper


def valid_token(method):
    @functools.wraps(method)
    def wrapper(self, *args, **kwargs):
        if self.auth and self.table == 'results':
            try:
                token = self.request.headers['X-Auth-Token']
            except KeyError:
                raises.Unauthorized(message.unauthorized())
            query = {'access_token': token}
            check = yield dbapi.db_find_one('tokens', query)
            if not check:
                raises.Forbidden(message.invalid_token())
        ret = yield gen.coroutine(method)(self, *args, **kwargs)
        raise gen.Return(ret)
    return wrapper


def not_exist(xstep):
    @functools.wraps(xstep)
    def wrap(self, *args, **kwargs):
        query = kwargs.get('query')
        data = yield dbapi.db_find_one(self.table, query)
        if not data:
            raises.NotFound(message.not_found(self.table, query))
        ret = yield gen.coroutine(xstep)(self, data, *args, **kwargs)
        raise gen.Return(ret)

    return wrap


def no_body(xstep):
    @functools.wraps(xstep)
    def wrap(self, *args, **kwargs):
        if self.json_args is None:
            raises.BadRequest(message.no_body())
        ret = yield gen.coroutine(xstep)(self, *args, **kwargs)
        raise gen.Return(ret)

    return wrap


def miss_fields(xstep):
    @functools.wraps(xstep)
    def wrap(self, *args, **kwargs):
        fields = kwargs.pop('miss_fields', [])
        if fields:
            for miss in fields:
                miss_data = self.json_args.get(miss)
                if miss_data is None or miss_data == '':
                    raises.BadRequest(message.missing(miss))
        ret = yield gen.coroutine(xstep)(self, *args, **kwargs)
        raise gen.Return(ret)
    return wrap


def carriers_exist(xstep):
    @functools.wraps(xstep)
    def wrap(self, *args, **kwargs):
        carriers = kwargs.pop('carriers', {})
        if carriers:
            for table, query in carriers:
                exist = yield dbapi.db_find_one(table, query())
                if not exist:
                    raises.Forbidden(message.not_found(table, query()))
        ret = yield gen.coroutine(xstep)(self, *args, **kwargs)
        raise gen.Return(ret)
    return wrap


def values_check(xstep):
    @functools.wraps(xstep)
    def wrap(self, *args, **kwargs):
        checks = kwargs.pop('values_check', {})
        if checks:
            for field, check, options in checks:
                if not check(field, options):
                    raises.BadRequest(message.invalid_value(field, options))
        ret = yield gen.coroutine(xstep)(self, *args, **kwargs)
        raise gen.Return(ret)
    return wrap


def new_not_exists(xstep):
    @functools.wraps(xstep)
    def wrap(self, *args, **kwargs):
        query = kwargs.get('query')
        if query:
            query_data = query()
            if self.table == 'pods':
                if query_data.get('name') is not None:
                    query_data['name'] = re.compile('\\b' + query_data.get('name') + '\\b', re.IGNORECASE)
            to_data = yield dbapi.db_find_one(self.table, query_data)
            if to_data:
                raises.Forbidden(message.exist(self.table, query()))
        ret = yield gen.coroutine(xstep)(self, *args, **kwargs)
        raise gen.Return(ret)
    return wrap


def updated_one_not_exist(xstep):
    @functools.wraps(xstep)
    def wrap(self, data, *args, **kwargs):
        db_keys = kwargs.pop('db_keys', [])
        query = self._update_query(db_keys, data)
        if query:
            to_data = yield dbapi.db_find_one(self.table, query)
            if to_data:
                raises.Forbidden(message.exist(self.table, query))
        ret = yield gen.coroutine(xstep)(self, data, *args, **kwargs)
        raise gen.Return(ret)
    return wrap


def query_by_name(xstep):
    @functools.wraps(xstep)
    def wrap(self, *args, **kwargs):
        if 'name' in self.request.query_arguments.keys():
            query = kwargs.get('query', {})
            query.update({'name': re.compile(self.get_query_argument('name'), re.IGNORECASE)})
            kwargs.update({'query': query})

        ret = yield gen.coroutine(xstep)(self, *args, **kwargs)
        raise gen.Return(ret)

    return wrap
