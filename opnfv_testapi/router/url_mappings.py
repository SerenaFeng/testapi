##############################################################################
# Copyright (c) 2015 Orange
# guyrodrigue.koffi@orange.com / koffirodrigue@gmail.com
# All rights reserved. This program and the accompanying materials
# are made available under the terms of the Apache License, Version 2.0
# which accompanies this distribution, and is available at
# http://www.apache.org/licenses/LICENSE-2.0
##############################################################################
import tornado.web

from opnfv_testapi.common.config import CONF
from opnfv_testapi.handlers import base_handlers
from opnfv_testapi.handlers import deploy_result_handlers as deploy_handlers
from opnfv_testapi.handlers import pod_handlers
from opnfv_testapi.handlers import project_handlers
from opnfv_testapi.handlers import result_handlers
from opnfv_testapi.handlers import root_handlers
from opnfv_testapi.handlers import scenario_handlers
from opnfv_testapi.handlers import sign_handlers
from opnfv_testapi.handlers import testcase_handlers
from opnfv_testapi.handlers import user_handlers

mappings = [
    # GET /versions => GET API version
    (r"/versions", base_handlers.VersionHandler),

    # few examples:
    # GET /api/v1/pods => Get all pods
    # GET /api/v1/pods/1 => Get details on POD 1
    (r"/api/v1/pods", pod_handlers.PodCLHandler),
    (r"/api/v1/pods/([^/]+)", pod_handlers.PodGURHandler),

    # few examples:
    # GET /projects
    # GET /projects/yardstick
    (r"/api/v1/projects", project_handlers.ProjectCLHandler),
    (r"/api/v1/projects/([^/]+)", project_handlers.ProjectGURHandler),

    # few examples
    # GET /projects/qtip/cases => Get cases for qtip
    (r"/api/v1/projects/([^/]+)/cases", testcase_handlers.TestcaseCLHandler),
    (r"/api/v1/projects/([^/]+)/cases/([^/]+)",
     testcase_handlers.TestcaseGURHandler),

    # new path to avoid a long depth
    # GET /results?project=functest&case=keystone.catalog&pod=1
    #   => get results with optional filters
    # POST /results =>
    # Push results with mandatory request payload parameters
    # (project, case, and pod)
    (r"/api/v1/results", result_handlers.ResultsCLHandler),
    (r'/api/v1/results/upload', result_handlers.ResultsUploadHandler),
    (r"/api/v1/results/([^/]+)", result_handlers.ResultsGURHandler),
    (r"/api/v1/deployresults", deploy_handlers.DeployResultsHandler),

    # scenarios
    (r"/api/v1/scenarios", scenario_handlers.ScenariosCLHandler),
    (r"/api/v1/scenarios/([^/]+)", scenario_handlers.ScenarioGURHandler),
    (r"/api/v1/scenarios/([^/]+)/scores",
     scenario_handlers.ScenarioScoresHandler),
    (r"/api/v1/scenarios/([^/]+)/trust_indicators",
     scenario_handlers.ScenarioTIsHandler),
    (r"/api/v1/scenarios/([^/]+)/customs",
     scenario_handlers.ScenarioCustomsHandler),
    (r"/api/v1/scenarios/([^/]+)/projects",
     scenario_handlers.ScenarioProjectsHandler),
    (r"/api/v1/scenarios/([^/]+)/owner",
     scenario_handlers.ScenarioOwnerHandler),
    (r"/api/v1/scenarios/([^/]+)/versions",
     scenario_handlers.ScenarioVersionsHandler),
    (r"/api/v1/scenarios/([^/]+)/installers",
     scenario_handlers.ScenarioInstallersHandler),

    # static path
    (r'/(.*\.(css|png|gif|js|html|json|map|woff2|woff|ttf))',
     tornado.web.StaticFileHandler,
     {'path': CONF.ui_static_path}),

    (r'/', root_handlers.RootHandler),
    (r'/api/v1/auth/signin', sign_handlers.SigninHandler),
    (r'/{}'.format(CONF.lfid_signin_return),
     sign_handlers.SigninReturnHandler),
    (r'/api/v1/auth/signout', sign_handlers.SignoutHandler),
    (r'/api/v1/profile', user_handlers.UserHandler),

]
