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
class TIHistory(base_models.ModelBase):
    """
        @ptype step: L{float}
    """
    def __init__(self, date=None, step=0):
        self.date = date
        self.step = step


@swagger.model()
class TI(base_models.ModelBase):
    """
        @property histories: trust_indicator update histories
        @ptype histories: C{list} of L{TIHistory}
        @ptype current: L{float}
    """
    def __init__(self, current=0):
        self.current = current
        self.histories = list()

    def __eq__(self, other):
        return (self.current == other.current and self._histories_eq(other))

    def _histories_eq(self, other):
        hs_equal = all(self.histories[i] == other.histories[i]
                       for i in range(len(self.histories)))
        return len(self.histories) == len(other.histories) and hs_equal

    @staticmethod
    def attr_parser():
        return {'histories': TIHistory}


@swagger.model()
class ResultCreateRequest(base_models.ModelBase):
    """
        @property trust_indicator:
        @ptype trust_indicator: L{TI}
    """
    def __init__(self,
                 pod_name=None,
                 project_name=None,
                 case_name=None,
                 installer=None,
                 version=None,
                 start_date=None,
                 stop_date=None,
                 details=None,
                 build_tag=None,
                 scenario=None,
                 criteria=None,
                 user=None,
                 public="true",
                 trust_indicator=None):
        self.pod_name = pod_name
        self.project_name = project_name
        self.case_name = case_name
        self.installer = installer
        self.version = version
        self.start_date = start_date
        self.stop_date = stop_date
        self.details = details
        self.build_tag = build_tag
        self.scenario = scenario
        self.criteria = criteria
        self.user = user
        self.public = public
        self.trust_indicator = trust_indicator if trust_indicator else TI(0)

    def __eq__(self, other):
        simple_equal = all(getattr(self, k) == getattr(other, k)
                           for k in self.format().keys()
                           if k not in ['_id', 'trust_indicator'])
        return simple_equal and self.trust_indicator == other.trust_indicator

    @staticmethod
    def attr_parser():
        return {'trust_indicator': TI}


@swagger.model()
class ResultUpdateRequest(base_models.ModelBase):
    """
        @property trust_indicator:
        @ptype trust_indicator: L{TI}
    """
    def __init__(self, trust_indicator=None):
        self.trust_indicator = trust_indicator


@swagger.model()
class TestResult(ResultCreateRequest):
    """
        @property trust_indicator: used for long duration test case
        @ptype trust_indicator: L{TI}
    """
    def __init__(self, _id=None, **kwargs):
        super(TestResult, self).__init__(**kwargs)
        self._id = _id


@swagger.model()
class TestResults(base_models.ModelBase):
    """
        @property results:
        @ptype results: C{list} of L{TestResult}
    """
    def __init__(self):
        self.results = list()

    @staticmethod
    def attr_parser():
        return {'results': TestResult}
