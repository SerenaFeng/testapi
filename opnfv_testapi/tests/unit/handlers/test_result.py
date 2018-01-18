##############################################################################
# Copyright (c) 2016 ZTE Corporation
# feng.xiaowei@zte.com.cn
# All rights reserved. This program and the accompanying materials
# are made available under the terms of the Apache License, Version 2.0
# which accompanies this distribution, and is available at
# http://www.apache.org/licenses/LICENSE-2.0
##############################################################################
import copy
from datetime import datetime
from datetime import timedelta
import httplib
import json
import urllib

from opnfv_testapi.common import message
from opnfv_testapi.models import result_models as rm
from opnfv_testapi.tests.unit import executor
from opnfv_testapi.tests.unit import fake_pymongo
from opnfv_testapi.tests.unit.handlers import test_base as base


class TestResultBase(base.TestBase):
    @executor.mock_valid_lfid()
    def setUp(self):
        super(TestResultBase, self).setUp()
        self.req_d = rm.ResultCreateRequest.from_dict(
            self.load_json('test_result'))
        self.req_d.start_date = str(datetime.now())
        self.req_d.stop_date = str(datetime.now() + timedelta(minutes=1))
        self.get_res = rm.TestResult
        self.list_res = rm.TestResults
        self.update_res = rm.TestResult
        self.basePath = '/api/v1/results'
        fake_pymongo.pods.insert({'name': self.req_d.pod_name})
        fake_pymongo.projects.insert({'name': self.req_d.project_name})
        fake_pymongo.testcases.insert({'name': self.req_d.case_name,
                                       'project_name': self.req_d.project_name})

    def assert_res(self, result, req=None):
        if req is None:
            req = self.req_d
        self.assertEqual(result, req)

    def _create_d(self):
        _, res = self.create_d()
        return res.href.split('/')[-1]

    def upload(self, req):
        if req and not isinstance(req, str) and hasattr(req, 'format'):
            req = req.format()
        res = self.fetch(self.basePath + '/upload',
                         method='POST',
                         body=json.dumps(req),
                         headers=self.headers)

        return self._get_return(res, self.create_res)


class TestResultUpload(TestResultBase):
    @executor.upload(httplib.BAD_REQUEST, message.key_error('file'))
    def test_filenotfind(self):
        return None


class TestResultCreate(TestResultBase):
    @executor.create(httplib.BAD_REQUEST, message.no_body())
    def test_nobody(self):
        return None

    @executor.create(httplib.BAD_REQUEST, message.missing('pod_name'))
    def test_podNotProvided(self):
        req = self.req_d
        req.pod_name = None
        return req

    @executor.create(httplib.BAD_REQUEST, message.missing('project_name'))
    def test_projectNotProvided(self):
        req = self.req_d
        req.project_name = None
        return req

    @executor.create(httplib.BAD_REQUEST, message.missing('case_name'))
    def test_testcaseNotProvided(self):
        req = self.req_d
        req.case_name = None
        return req

    @executor.create(httplib.BAD_REQUEST,
                     message.invalid_value('criteria', ['PASS', 'FAIL']))
    def test_invalid_criteria(self):
        req = self.req_d
        req.criteria = 'invalid'
        return req

    @executor.create(httplib.FORBIDDEN, message.not_found_base)
    def test_noPod(self):
        req = self.req_d
        req.pod_name = 'notExistPod'
        return req

    @executor.create(httplib.FORBIDDEN, message.not_found_base)
    def test_noProject(self):
        req = self.req_d
        req.project_name = 'notExistProject'
        return req

    @executor.create(httplib.FORBIDDEN, message.not_found_base)
    def test_noTestcase(self):
        req = self.req_d
        req.case_name = 'notExistTestcase'
        return req

    @executor.create(httplib.OK, 'assert_href')
    def test_success(self):
        return self.req_d

    @executor.create(httplib.OK, 'assert_href')
    def test_key_with_doc(self):
        req = copy.deepcopy(self.req_d)
        req.details = {'1.name': 'dot_name'}
        return req

    @executor.create(httplib.OK, '_assert_no_ti')
    def test_no_ti(self):
        req = copy.deepcopy(self.req_d)
        req.trust_indicator = rm.TI(0)
        self.actual_req = req
        return req

    def _assert_no_ti(self, body):
        _id = body.href.split('/')[-1]
        code, body = self.get(_id)
        self.assert_res(body, self.actual_req)


class TestResultGet(TestResultBase):
    def setUp(self):
        super(TestResultGet, self).setUp()
        self.req_10d_before = self._create_changed_date(days=-10)
        self.req_d_id = self._create_d()
        self.req_10d_later = self._create_changed_date(days=10)

    @executor.get(httplib.OK, 'assert_res')
    def test_getOne(self):
        return self.req_d_id

    @executor.query(httplib.OK, '_query_success', 3)
    def test_queryPod(self):
        return self._set_query('pod')

    @executor.query(httplib.OK, '_query_success', 3)
    def test_queryProject(self):
        return self._set_query('project')

    @executor.query(httplib.OK, '_query_success', 3)
    def test_queryTestcase(self):
        return self._set_query('case')

    @executor.query(httplib.OK, '_query_success', 3)
    def test_queryVersion(self):
        return self._set_query('version')

    @executor.query(httplib.OK, '_query_success', 3)
    def test_queryInstaller(self):
        return self._set_query('installer')

    @executor.query(httplib.OK, '_query_success', 3)
    def test_queryBuildTag(self):
        return self._set_query('build_tag')

    @executor.query(httplib.OK, '_query_success', 3)
    def test_queryScenario(self):
        return self._set_query('scenario')

    @executor.query(httplib.OK, '_query_success', 3)
    def test_queryTrustIndicator(self):
        return self._set_query('trust_indicator')

    @executor.query(httplib.OK, '_query_success', 3)
    def test_queryCriteria(self):
        return self._set_query('criteria')

    @executor.query(httplib.BAD_REQUEST, message.must_int('period'))
    def test_queryPeriodNotInt(self):
        return self._set_query(period='a')

    @executor.query(httplib.OK, '_query_period_one', 1)
    def test_queryPeriodSuccess(self):
        return self._set_query(period=5)

    @executor.query(httplib.BAD_REQUEST, message.must_int('last'))
    def test_queryLastNotInt(self):
        return self._set_query(last='a')

    @executor.query(httplib.OK, '_query_last_one', 1)
    def test_queryLast(self):
        return self._set_query(last=1)

    @executor.query(httplib.OK, '_query_success', 4)
    def test_queryPublic(self):
        self._create_public_data()
        return self._set_query()

    @executor.query(httplib.OK, '_query_success', 1)
    def test_queryPrivate(self):
        self._create_private_data()
        return self._set_query(public='false')

    @executor.query(httplib.OK, '_query_period_one', 1)
    def test_combination(self):
        return self._set_query('pod',
                               'project',
                               'case',
                               'version',
                               'installer',
                               'build_tag',
                               'scenario',
                               'trust_indicator',
                               'criteria',
                               period=5)

    @executor.query(httplib.OK, '_query_success', 0)
    def test_notFound(self):
        return self._set_query('project',
                               'case',
                               'version',
                               'installer',
                               'build_tag',
                               'scenario',
                               'trust_indicator',
                               'criteria',
                               pod='notExistPod',
                               period=1)

    @executor.query(httplib.OK, '_query_success', 1)
    def test_filterErrorStartdate(self):
        self._create_error_start_date(None)
        self._create_error_start_date('None')
        self._create_error_start_date('null')
        self._create_error_start_date('')
        return self._set_query(period=5)

    def _query_success(self, body, number):
        self.assertEqual(number, len(body.results))

    def _query_last_one(self, body, number):
        self.assertEqual(number, len(body.results))
        self.assert_res(body.results[0], self.req_10d_later)

    def _query_period_one(self, body, number):
        self.assertEqual(number, len(body.results))
        self.assert_res(body.results[0], self.req_d)

    def _create_error_start_date(self, start_date):
        req = copy.deepcopy(self.req_d)
        req.start_date = start_date
        self.create(req)
        return req

    def _create_changed_date(self, **kwargs):
        req = copy.deepcopy(self.req_d)
        req.start_date = datetime.now() + timedelta(**kwargs)
        req.stop_date = str(req.start_date + timedelta(minutes=10))
        req.start_date = str(req.start_date)
        self.create(req)
        return req

    def _create_public_data(self, **kwargs):
        req = copy.deepcopy(self.req_d)
        req.public = 'true'
        self.create(req)
        return req

    def _create_private_data(self, **kwargs):
        req = copy.deepcopy(self.req_d)
        req.public = 'false'
        self.create(req)
        return req

    def _set_query(self, *args, **kwargs):
        def get_value(arg):
            if arg in ['pod', 'project', 'case']:
                return getattr(self.req_d, arg + '_name')
            elif arg == 'trust_indicator':
                return self.req_d.trust_indicator.current
            else:
                return getattr(self.req_d, arg)

        query = []
        for arg in args:
            query.append((arg, get_value(arg)))
        for k, v in kwargs.iteritems():
            query.append((k, v))
        return urllib.urlencode(query)


class TestResultUpdate(TestResultBase):
    def setUp(self):
        super(TestResultUpdate, self).setUp()
        self.req_d_id = self._create_d()

    @executor.update(httplib.OK, '_assert_update_ti')
    def test_success(self):
        update_date = str(datetime.now() + timedelta(days=1))
        update_step = -0.05
        self.after_update = copy.deepcopy(self.req_d)
        self.after_update.trust_indicator.current += update_step
        self.after_update.trust_indicator.histories.append(
            rm.TIHistory(update_date, update_step))
        update = rm.ResultUpdateRequest(
            trust_indicator=self.after_update.trust_indicator)
        return update, self.req_d_id

    def _assert_update_ti(self, request, body):
        self.assert_res(body, self.after_update)
