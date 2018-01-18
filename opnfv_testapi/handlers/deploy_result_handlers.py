from opnfv_testapi.handlers import result_handlers
from opnfv_testapi.models import deploy_result_models
from opnfv_testapi.tornado_swagger import swagger


class GenericDeployResultHandler(result_handlers.GenericResultHandler):
    def __init__(self, application, request, **kwargs):
        super(GenericDeployResultHandler, self).__init__(application,
                                                         request,
                                                         **kwargs)
        self.table = self.db_deployresults
        self.table_cls = deploy_result_models.DeployResult


class DeployResultsHandler(GenericDeployResultHandler):
    @swagger.operation(nickname="queryDeployResults")
    def get(self):
        """
            @description: Retrieve deployment result(s).
            @notes: Retrieve deployment result(s).
                Available filters for this request are :
                 - installer : fuel/apex/compass/joid/daisy
                 - version : platform version (Arno-R1, ...)
                 - pod_name : pod name
                 - job_name : jenkins job name
                 - build_id : Jenkins build id
                 - scenario : the test scenario
                 - period : x last days, incompatible with from/to
                 - from : starting time in 2016-01-01 or 2016-01-01 00:01:23
                 - to : ending time in 2016-01-01 or 2016-01-01 00:01:23
                 - criteria : the global criteria status passed or failed
                 - page : which page to list, default to 1
                 - descend : true, newest2oldest; false, oldest2newest

                GET /deployresults/installer=daisy&version=master \
                &pod_name=pod_name&period=15
            @return 200: all deployment results consist with query,
                         empty list if no result is found
            @rtype: L{DeployResults}
            @param installer: installer name
            @type installer: L{string}
            @in installer: query
            @required installer: False
            @param version: version name
            @type version: L{string}
            @in version: query
            @required version: False
            @param pod_name: pod name
            @type pod_name: L{string}
            @in pod_name: query
            @required pod_name: False
            @param job_name: jenkins job name
            @type job_name: L{string}
            @in job_name: query
            @required job_name: False
            @param build_id: jenkins build_id
            @type build_id: L{string}
            @in build_id: query
            @required build_id: False
            @param scenario: i.e. odl
            @type scenario: L{string}
            @in scenario: query
            @required scenario: False
            @param criteria: i.e. PASS/FAIL
            @type criteria: L{string}
            @in criteria: query
            @required criteria: False
            @param period: last days
            @type period: L{string}
            @in period: query
            @required period: False
            @param from: i.e. 2016-01-01 or 2016-01-01 00:01:23
            @type from: L{string}
            @in from: query
            @required from: False
            @param to: i.e. 2016-01-01 or 2016-01-01 00:01:23
            @type to: L{string}
            @in to: query
            @required to: False
            @param page: which page to list, default to 1
            @type page: L{int}
            @in page: query
            @required page: False
            @param descend: true, newest2oldest; false, oldest2newest
            @type descend: L{string}
            @in descend: query
            @required descend: False
        """
        super(DeployResultsHandler, self).get()

    @swagger.operation(nickname="createDeployResult")
    def post(self):
        """
            @description: create a deployment result
            @param body: deployment result to be created
            @type body: L{DeployResultCreateRequest}
            @in body: body
            @rtype: L{CreateResponse}
            @return 200: deploy result is created.
            @raise 404: pod not exist
            @raise 400: body or some field is not provided
        """
        def pod_query():
            return {'name': self.json_args.get('pod_name')}

        def options_check(field, options):
            return self.json_args.get(field).upper() in options

        miss_fields = ['pod_name', 'installer', 'scenario']
        carriers = [('pods', pod_query)]
        values_check = [('criteria', options_check, ['PASS', 'FAIL'])]

        self._create(miss_fields=miss_fields,
                     carriers=carriers,
                     values_check=values_check)
