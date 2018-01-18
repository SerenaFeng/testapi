##############################################################################
# Copyright (c) 2015 Orange
# guyrodrigue.koffi@orange.com / koffirodrigue@gmail.com
# All rights reserved. This program and the accompanying materials
# are made available under the terms of the Apache License, Version 2.0
# which accompanies this distribution, and is available at
# http://www.apache.org/licenses/LICENSE-2.0
##############################################################################
from opnfv_testapi.models import base_models
from opnfv_testapi.tornado_swagger import swagger


@swagger.model()
class TestcaseCreateRequest(base_models.ModelBase):
    def __init__(self, name=None,
                 url=None,
                 description=None,
                 catalog_description=None,
                 tier=None,
                 ci_loop=None,
                 criteria=None,
                 blocking=None,
                 dependencies=None,
                 run=None,
                 domains=None,
                 tags=None,
                 version=None,
                 trust='Silver'):
        self.name = name
        self.url = url
        self.description = description
        self.catalog_description = catalog_description
        self.tier = tier
        self.ci_loop = ci_loop
        self.criteria = criteria
        self.blocking = blocking
        self.dependencies = dependencies
        self.run = run
        self.domains = domains
        self.tags = tags
        self.version = version
        self.trust = trust


@swagger.model()
class TestcaseUpdateRequest(TestcaseCreateRequest):
    def __init__(self, **kwargs):
        self.project_name = kwargs.pop('project_name', '')
        super(TestcaseUpdateRequest, self).__init__(**kwargs)


@swagger.model()
class Testcase(TestcaseCreateRequest):
    def __init__(self, **kwargs):
        self._id = kwargs.pop('_id', '')
        self.project_name = kwargs.pop('project_name', '')
        self.creation_date = kwargs.pop('creation_date', '')
        super(Testcase, self).__init__(**kwargs)


@swagger.model()
class Testcases(base_models.ModelBase):
    """
        @property testcases:
        @ptype testcases: C{list} of L{Testcase}
    """
    def __init__(self):
        self.testcases = list()

    @staticmethod
    def attr_parser():
        return {'testcases': Testcase}
