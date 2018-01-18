##############################################################################
# Copyright (c) 2016 ZTE Corporation
# feng.xiaowei@zte.com.cn
# All rights reserved. This program and the accompanying materials
# are made available under the terms of the Apache License, Version 2.0
# which accompanies this distribution, and is available at
# http://www.apache.org/licenses/LICENSE-2.0
##############################################################################
import httplib

from opnfv_testapi.common import message
from opnfv_testapi.models import pod_models as pm
from opnfv_testapi.tests.unit import executor
from opnfv_testapi.tests.unit import fake_pymongo
from opnfv_testapi.tests.unit.handlers import test_base as base


class TestPodBase(base.TestBase):
    def setUp(self):
        super(TestPodBase, self).setUp()
        self.get_res = pm.Pod
        self.list_res = pm.Pods
        self.basePath = '/api/v1/pods'
        self.req_d = pm.PodCreateRequest.from_dict(self.pod_d.format())
        self.req_e = pm.PodCreateRequest.from_dict(self.pod_e.format())

    def assert_get_body(self, pod, req=None):
        if not req:
            req = self.req_d
        self.assertEqual(pod, pm.Pod(owner='ValidUser', **req.format()))
        self.assertIsNotNone(pod.creation_date)
        self.assertIsNotNone(pod._id)


class TestPodCreate(TestPodBase):
    @executor.create(httplib.BAD_REQUEST, message.not_login())
    def test_notlogin(self):
        return self.req_d

    @executor.mock_invalid_lfid()
    @executor.create(httplib.BAD_REQUEST, message.not_lfid())
    def test_invalidLfid(self):
        return self.req_d

    @executor.mock_valid_lfid()
    @executor.create(httplib.BAD_REQUEST, message.no_body())
    def test_withoutBody(self):
        return None

    @executor.mock_valid_lfid()
    @executor.create(httplib.BAD_REQUEST, message.missing('name'))
    def test_emptyName(self):
        return pm.PodCreateRequest('')

    @executor.mock_valid_lfid()
    @executor.create(httplib.BAD_REQUEST, message.missing('name'))
    def test_noneName(self):
        return pm.PodCreateRequest(None)

    @executor.mock_valid_lfid()
    @executor.create(httplib.OK, 'assert_create_body')
    def test_success(self):
        return self.req_d

    @executor.mock_valid_lfid()
    @executor.create(httplib.FORBIDDEN, message.exist_base)
    def test_alreadyExist(self):
        fake_pymongo.pods.insert(self.pod_d.format())
        return self.req_d

    @executor.mock_valid_lfid()
    @executor.create(httplib.FORBIDDEN, message.exist_base)
    def test_alreadyExistCaseInsensitive(self):
        fake_pymongo.pods.insert(self.pod_d.format())
        self.req_d.name = self.req_d.name.upper()
        return self.req_d


class TestPodGet(TestPodBase):
    def setUp(self):
        super(TestPodGet, self).setUp()
        fake_pymongo.pods.insert(self.pod_d.format())
        fake_pymongo.pods.insert(self.pod_e.format())

    @executor.get(httplib.NOT_FOUND, message.not_found_base)
    def test_notExist(self):
        return 'notExist'

    @executor.get(httplib.OK, 'assert_get_body')
    def test_getOne(self):
        return self.req_d.name

    @executor.get(httplib.OK, '_assert_list')
    def test_list(self):
        return None

    def _assert_list(self, body):
        self.assertEqual(len(body.pods), 2)
        for pod in body.pods:
            if self.req_d.name == pod.name:
                self.assert_get_body(pod)
            else:
                self.assert_get_body(pod, self.req_e)
