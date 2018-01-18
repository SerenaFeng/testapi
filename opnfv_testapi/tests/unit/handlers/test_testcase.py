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
from opnfv_testapi.models import testcase_models as tcm
from opnfv_testapi.tests.unit import executor
from opnfv_testapi.tests.unit import fake_pymongo
from opnfv_testapi.tests.unit.handlers import test_base as base


class TestCaseBase(base.TestBase):
    def setUp(self):
        super(TestCaseBase, self).setUp()
        self.project = 'functest'
        self.req_d = tcm.TestcaseCreateRequest.from_dict(
            self.load_json('testcase_d'))
        self.req_e = tcm.TestcaseCreateRequest.from_dict(
            self.load_json('testcase_e'))
        self.update_req = tcm.TestcaseUpdateRequest(project_name=self.project,
                                                    **self.req_e.format())

        self.get_res = tcm.Testcase
        self.list_res = tcm.Testcases
        self.update_res = tcm.Testcase
        self.basePath = '/api/v1/projects/%s/cases'
        fake_pymongo.projects.insert(self.project_e.format())
        print self.req_d.format()

    def assert_body(self, case, req=None):
        if not req:
            req = self.req_d
        self.assertEqual(req,
                         tcm.TestcaseCreateRequest.from_dict(case.format()))
        self.assertEqual(case.project_name, self.project)
        self.assertIsNotNone(case._id)
        self.assertIsNotNone(case.creation_date)

    def assert_update_body(self, new_record, req=None):
        if not req:
            req = self.req_d
        self.assertEqual(req, new_record)
        self.assertIsNotNone(new_record._id)
        self.assertIsNotNone(new_record.creation_date)

    @executor.mock_valid_lfid()
    def create_d(self):
        return super(TestCaseBase, self).create_d(self.project)

    @executor.mock_valid_lfid()
    def create_e(self):
        return super(TestCaseBase, self).create_e(self.project)

    def get(self, case=None):
        return super(TestCaseBase, self).get(self.project, case)

    @executor.mock_valid_lfid()
    def create(self, req=None, *args):
        return super(TestCaseBase, self).create(req, self.project)

    @executor.mock_valid_lfid()
    def update(self, new=None, case=None):
        return super(TestCaseBase, self).update(new, self.project, case)

    @executor.mock_valid_lfid()
    def delete(self, case):
        return super(TestCaseBase, self).delete(self.project, case)


class TestCaseCreate(TestCaseBase):
    @executor.create(httplib.BAD_REQUEST, message.no_body())
    def test_noBody(self):
        return None

    @executor.create(httplib.FORBIDDEN, message.not_found_base)
    def test_noProject(self):
        self.project = 'noProject'
        return self.req_d

    @executor.create(httplib.BAD_REQUEST, message.missing('name'))
    def test_emptyName(self):
        req_empty = tcm.TestcaseCreateRequest('')
        return req_empty

    @executor.create(httplib.BAD_REQUEST, message.missing('name'))
    def test_noneName(self):
        req_none = tcm.TestcaseCreateRequest(None)
        return req_none

    @executor.create(httplib.OK, '_assert_success')
    def test_success(self):
        return self.req_d

    def _assert_success(self, body):
        self.assert_create_body(body, self.req_d, self.project)

    @executor.create(httplib.FORBIDDEN, message.exist_base)
    def test_alreadyExist(self):
        self.create_d()
        return self.req_d


class TestCaseGet(TestCaseBase):
    def setUp(self):
        super(TestCaseGet, self).setUp()
        self.create_d()
        self.create_e()

    @executor.get(httplib.NOT_FOUND, message.not_found_base)
    def test_notExist(self):
        return 'notExist'

    @executor.get(httplib.OK, 'assert_body')
    def test_getOne(self):
        return self.req_d.name

    @executor.get(httplib.OK, '_list')
    def test_list(self):
        return None

    def _list(self, body):
        for case in body.testcases:
            if self.req_d.name == case.name:
                self.assert_body(case)
            else:
                self.assert_body(case, self.req_e)


class TestCaseUpdate(TestCaseBase):
    def setUp(self):
        super(TestCaseUpdate, self).setUp()
        self.create_d()

    @executor.update(httplib.BAD_REQUEST, message.no_body())
    def test_noBody(self):
        return None, 'noBody'

    @executor.update(httplib.NOT_FOUND, message.not_found_base)
    def test_notFound(self):
        update = tcm.TestcaseUpdateRequest(description='update description')
        return update, 'notFound'

    @executor.update(httplib.FORBIDDEN, message.exist_base)
    def test_newNameExist(self):
        self.create_e()
        return self.update_req, self.req_d.name

    @executor.update(httplib.FORBIDDEN, message.no_update())
    def test_noUpdate(self):
        update = tcm.TestcaseUpdateRequest(project_name=self.project,
                                           **self.req_d.format())
        return update, self.req_d.name

    @executor.update(httplib.OK, '_update_success')
    def test_success(self):
        return self.update_req, self.req_d.name

    @executor.update(httplib.OK, '_update_success')
    def test_with_dollar(self):
        self.update_req.description = {'2. change': 'dollar change'}
        return self.update_req, self.req_d.name

    def _update_success(self, request, body):
        self.assert_update_body(body, request)
        _, new_body = self.get(request.name)
        self.assert_update_body(new_body, request)


class TestCaseDelete(TestCaseBase):
    def setUp(self):
        super(TestCaseDelete, self).setUp()
        self.create_d()

    @executor.delete(httplib.NOT_FOUND, message.not_found_base)
    def test_notFound(self):
        return 'notFound'

    @executor.delete(httplib.OK, '_delete_success')
    def test_success(self):
        return self.req_d.name

    def _delete_success(self, body):
        self.assertEqual(body, '')
        code, body = self.get(self.req_d.name)
        self.assertEqual(code, httplib.NOT_FOUND)
