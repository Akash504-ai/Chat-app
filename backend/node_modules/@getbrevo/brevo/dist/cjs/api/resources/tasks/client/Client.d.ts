import type { BaseClientOptions, BaseRequestOptions } from "../../../../BaseClient.js";
import { type NormalizedClientOptionsWithAuth } from "../../../../BaseClient.js";
import * as core from "../../../../core/index.js";
import * as Brevo from "../../../index.js";
export declare namespace TasksClient {
    type Options = BaseClientOptions;
    interface RequestOptions extends BaseRequestOptions {
    }
}
export declare class TasksClient {
    protected readonly _options: NormalizedClientOptionsWithAuth<TasksClient.Options>;
    constructor(options: TasksClient.Options);
    /**
     * @param {Brevo.GetCrmTasksRequest} request
     * @param {TasksClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.tasks.getAllTasks({
     *         sortBy: "name"
     *     })
     */
    getAllTasks(request?: Brevo.GetCrmTasksRequest, requestOptions?: TasksClient.RequestOptions): core.HttpResponsePromise<Brevo.GetCrmTasksResponse>;
    private __getAllTasks;
    /**
     * @param {Brevo.PostCrmTasksRequest} request
     * @param {TasksClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.tasks.createATask({
     *         date: "2021-11-01T17:44:54Z",
     *         name: "Task: Connect with client_dev",
     *         taskTypeId: "61a5cd07ca1347c82306ad09"
     *     })
     */
    createATask(request: Brevo.PostCrmTasksRequest, requestOptions?: TasksClient.RequestOptions): core.HttpResponsePromise<Brevo.PostCrmTasksResponse>;
    private __createATask;
    /**
     * @param {Brevo.GetCrmTasksIdRequest} request
     * @param {TasksClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.tasks.getATask({
     *         id: "id"
     *     })
     */
    getATask(request: Brevo.GetCrmTasksIdRequest, requestOptions?: TasksClient.RequestOptions): core.HttpResponsePromise<Brevo.Task>;
    private __getATask;
    /**
     * @param {Brevo.DeleteCrmTasksIdRequest} request
     * @param {TasksClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.tasks.deleteATask({
     *         id: "id"
     *     })
     */
    deleteATask(request: Brevo.DeleteCrmTasksIdRequest, requestOptions?: TasksClient.RequestOptions): core.HttpResponsePromise<void>;
    private __deleteATask;
    /**
     * @param {Brevo.PatchCrmTasksIdRequest} request
     * @param {TasksClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.tasks.updateATask({
     *         id: "id"
     *     })
     */
    updateATask(request: Brevo.PatchCrmTasksIdRequest, requestOptions?: TasksClient.RequestOptions): core.HttpResponsePromise<void>;
    private __updateATask;
    /**
     * @param {TasksClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.tasks.getAllTaskTypes()
     */
    getAllTaskTypes(requestOptions?: TasksClient.RequestOptions): core.HttpResponsePromise<Brevo.GetCrmTasktypesResponse>;
    private __getAllTaskTypes;
}
