##############################################################################
# Copyright (c) 2016 ZTE Corporation
# feng.xiaowei@zte.com.cn
# All rights reserved. This program and the accompanying materials
# are made available under the terms of the Apache License, Version 2.0
# which accompanies this distribution, and is available at
# http://www.apache.org/licenses/LICENSE-2.0
##############################################################################
import httplib
import unittest
import urllib

from opnfv_testapi.common import message
from opnfv_testapi.models import project_models
from opnfv_testapi.tests.unit import executor
from opnfv_testapi.tests.unit.handlers import test_base as base


class TestProjectBase(base.TestBase):
    def setUp(self):
        super(TestProjectBase, self).setUp()
        self.req_d = project_models.ProjectCreateRequest('qtip',
                                                         'qtip-ssh test')
        self.req_e = project_models.ProjectCreateRequest('functest',
                                                         'functest test')
        self.get_res = project_models.Project
        self.list_res = project_models.Projects
        self.update_res = project_models.Project
        self.name = 'functest'
        self.basePath = '/api/v1/projects'

    def assert_body(self, project, req=None):
        if not req:
            req = self.req_d
        self.assertEqual(project.name, req.name)
        self.assertEqual(project.description, req.description)
        self.assertIsNotNone(project._id)
        self.assertIsNotNone(project.creation_date)


class TestProjectCreate(TestProjectBase):

    @executor.create(httplib.BAD_REQUEST, message.not_login())
    def test_notlogin(self):
        return self.req_d

    @executor.mock_valid_lfid()
    @executor.create(httplib.BAD_REQUEST, message.no_body())
    def test_withoutBody(self):
        return None

    @executor.mock_valid_lfid()
    @executor.create(httplib.BAD_REQUEST, message.missing('name'))
    def test_emptyName(self):
        return project_models.ProjectCreateRequest('')

    @executor.mock_valid_lfid()
    @executor.create(httplib.BAD_REQUEST, message.missing('name'))
    def test_noneName(self):
        return project_models.ProjectCreateRequest(None)

    @executor.mock_valid_lfid()
    @executor.create(httplib.OK, 'assert_create_body')
    def test_success(self):
        return self.req_d

    @executor.mock_valid_lfid()
    @executor.create(httplib.FORBIDDEN, message.exist_base)
    def test_alreadyExist(self):
        self.create_d()
        return self.req_d


class TestProjectGet(TestProjectBase):

    @executor.mock_valid_lfid()
    def setUp(self):
        super(TestProjectGet, self).setUp()
        self.create_d()
        self.create_e()

    @executor.get(httplib.NOT_FOUND, message.not_found_base)
    def test_notExist(self):
        return 'notExist'

    @executor.get(httplib.OK, 'assert_body')
    def test_getOne(self):
        return self.req_d.name

    @executor.get(httplib.OK, '_assert_list')
    def test_list(self):
        return None

    @executor.query(httplib.OK, '_query_success', 1)
    def test_queryName(self):
        return self._set_query('name')

    def _assert_list(self, body):
        for project in body.projects:
            if self.req_d.name == project.name:
                self.assert_body(project)
            else:
                self.assert_body(project, self.req_e)

    def _set_query(self, *args, **kwargs):
        def get_value(arg):
            return self.__getattribute__(arg)
        query = []
        for arg in args:
            query.append((arg, get_value(arg)))
        for k, v in kwargs.iteritems():
            query.append((k, v))
        return urllib.urlencode(query)

    def _query_success(self, body, number):
        self.assertEqual(number, len(body.projects))


class TestProjectUpdate(TestProjectBase):
    @executor.mock_valid_lfid()
    def setUp(self):
        super(TestProjectUpdate, self).setUp()
        _, d_body = self.create_d()
        _, get_res = self.get(self.req_d.name)
        self.index_d = get_res._id
        self.create_e()

    @executor.update(httplib.BAD_REQUEST, message.not_login())
    def test_notlogin(self):
        req = project_models.ProjectUpdateRequest('apex', 'apex test')
        return req, self.req_d.name

    @executor.update(httplib.BAD_REQUEST, message.no_body())
    def test_withoutBody(self):
        return None, 'noBody'

    @executor.mock_valid_lfid()
    @executor.update(httplib.NOT_FOUND, message.not_found_base)
    def test_notFound(self):
        return self.req_e, 'notFound'

    @executor.mock_valid_lfid()
    @executor.update(httplib.FORBIDDEN, message.exist_base)
    def test_newNameExist(self):
        return self.req_e, self.req_d.name

    @executor.mock_valid_lfid()
    @executor.update(httplib.FORBIDDEN, message.no_update())
    def test_noUpdate(self):
        return self.req_d, self.req_d.name

    @executor.mock_valid_lfid()
    @executor.update(httplib.OK, '_assert_update')
    def test_success(self):
        req = project_models.ProjectUpdateRequest('apex', 'apex test')
        return req, self.req_d.name

    def _assert_update(self, req, body):
        self.assertEqual(self.index_d, body._id)
        self.assert_body(body, req)
        _, new_body = self.get(req.name)
        self.assertEqual(self.index_d, new_body._id)
        self.assert_body(new_body, req)


class TestProjectDelete(TestProjectBase):
    @executor.mock_valid_lfid()
    def setUp(self):
        super(TestProjectDelete, self).setUp()
        self.create_d()

    @executor.delete(httplib.BAD_REQUEST, message.not_login())
    def test_notlogin(self):
        return self.req_d.name

    @executor.delete(httplib.NOT_FOUND, message.not_found_base)
    def test_notFound(self):
        return 'notFound'

    @executor.mock_valid_lfid()
    @executor.delete(httplib.OK, '_assert_delete')
    def test_success(self):
        return self.req_d.name

    def _assert_delete(self, body):
        self.assertEqual(body, '')
        code, body = self.get(self.req_d.name)
        self.assertEqual(code, httplib.NOT_FOUND)


if __name__ == '__main__':
    unittest.main()
