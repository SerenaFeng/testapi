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


# name: name of the POD e.g. zte-1
# mode: metal or virtual
# details: any detail
# role: ci-pod or community-pod or single-node


@swagger.model()
class PodCreateRequest(base_models.ModelBase):
    def __init__(self, name='', mode='', details='', role=""):
        self.name = name
        self.mode = mode
        self.details = details
        self.role = role


@swagger.model()
class Pod(PodCreateRequest):
    def __init__(self, **kwargs):
        self._id = kwargs.pop('_id', '')
        self.creation_date = kwargs.pop('creation_date', '')
        self.owner = kwargs.pop('owner', '')
        super(Pod, self).__init__(**kwargs)


@swagger.model()
class Pods(base_models.ModelBase):
    """
        @property pods:
        @ptype pods: C{list} of L{Pod}
    """
    def __init__(self):
        self.pods = list()

    @staticmethod
    def attr_parser():
        return {'pods': Pod}
