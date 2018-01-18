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
import urllib

from opnfv_testapi.common import message
from opnfv_testapi.models import deploy_result_models as drm
from opnfv_testapi.tests.unit import executor
from opnfv_testapi.tests.unit import fake_pymongo
from opnfv_testapi.tests.unit.handlers import test_base as base


class DeployResultBase(base.TestBase):
    @executor.mock_valid_lfid()
    def setUp(self):
        super(DeployResultBase, self).setUp()
        self.req_d = drm.DeployResultCreateRequest.from_dict(
            self.load_json('deploy_result'))
        self.req_d.start_date = str(datetime.now())
        self.req_d.stop_date = str(datetime.now() + timedelta(minutes=1))
        self.get_res = drm.DeployResult
        self.list_res = drm.DeployResults
        self.basePath = '/api/v1/deployresults'
        fake_pymongo.pods.insert(self.pod_d.format())

    def assert_res(self, deploy_result, req=None):
        if req is None:
            req = self.req_d
        print req.format()
        self.assertEqual(deploy_result, req)
        self.assertIsNotNone(deploy_result._id)

    def _create_d(self):
        _, res = self.create_d()
        return res.href.split('/')[-1]


class DeployResultCreate(DeployResultBase):
    @executor.create(httplib.BAD_REQUEST, message.no_body())
    def test_nobody(self):
        return None

    @executor.create(httplib.BAD_REQUEST, message.missing('pod_name'))
    def test_podNotProvided(self):
        req = self.req_d
        req.pod_name = None
        return req

    @executor.create(httplib.BAD_REQUEST, message.missing('installer'))
    def test_installerNotProvided(self):
        req = self.req_d
        req.installer = None
        return req

    @executor.create(httplib.BAD_REQUEST, message.missing('scenario'))
    def test_testcaseNotProvided(self):
        req = self.req_d
        req.scenario = None
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

    @executor.create(httplib.OK, 'assert_href')
    def test_success(self):
        return self.req_d


class DeployResultGet(DeployResultBase):
    def setUp(self):
        super(DeployResultGet, self).setUp()
        self.req_10d_before = self._create_changed_date(days=-10)
        self.req_d_id = self._create_d()
        self.req_10d_later = self._create_changed_date(days=10)

    @executor.query(httplib.OK, '_query_success', 3)
    def test_queryInstaller(self):
        return self._set_query('installer')

    @executor.query(httplib.OK, '_query_success', 3)
    def test_queryVersion(self):
        return self._set_query('version')

    @executor.query(httplib.OK, '_query_success', 3)
    def test_queryPod(self):
        return self._set_query('pod_name')

    @executor.query(httplib.OK, '_query_success', 3)
    def test_queryJob(self):
        return self._set_query('job_name')

    @executor.query(httplib.OK, '_query_success', 1)
    def test_queryBuildId(self):
        return self._set_query('build_id')

    @executor.query(httplib.OK, '_query_success', 3)
    def test_queryScenario(self):
        return self._set_query('scenario')

    @executor.query(httplib.OK, '_query_success', 3)
    def test_queryUpstreamJobName(self):
        return self._set_query('upstream_job_name')

    @executor.query(httplib.OK, '_query_success', 1)
    def test_queryUpstreamBuildId(self):
        return self._set_query('upstream_build_id')

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

    @executor.query(httplib.OK, '_query_period_one', 1)
    def test_combination(self):
        return self._set_query('installer',
                               'version',
                               'pod_name',
                               'job_name',
                               'build_id',
                               'scenario',
                               'upstream_job_name',
                               'upstream_build_id',
                               'criteria',
                               period=5)

    @executor.query(httplib.OK, '_query_success', 1)
    def test_filterErrorStartdate(self):
        self._create_error_start_date(None)
        self._create_error_start_date('None')
        self._create_error_start_date('null')
        self._create_error_start_date('')
        return self._set_query(period=5)

    def _query_success(self, body, number):
        self.assertEqual(number, len(body.deployresults))

    def _query_last_one(self, body, number):
        self.assertEqual(number, len(body.deployresults))
        self.assert_res(body.deployresults[0], self.req_10d_later)

    def _query_period_one(self, body, number):
        self.assertEqual(number, len(body.deployresults))
        self.assert_res(body.deployresults[0], self.req_d)

    def _create_error_start_date(self, start_date):
        req = copy.deepcopy(self.req_d)
        req.start_date = start_date
        self.create(req)
        return req

    def _create_changed_date(self, **kwargs):
        req = copy.deepcopy(self.req_d)
        req.build_id = req.build_id + kwargs.get('days')
        req.upstream_build_id = req.upstream_build_id + kwargs.get('days')
        req.start_date = datetime.now() + timedelta(**kwargs)
        req.stop_date = str(req.start_date + timedelta(minutes=10))
        req.start_date = str(req.start_date)
        self.create(req)
        return req

    def _set_query(self, *args, **kwargs):
        query = []
        for arg in args:
            query.append((arg, getattr(self.req_d, arg)))
        for k, v in kwargs.iteritems():
            query.append((k, v))
        return urllib.urlencode(query)
