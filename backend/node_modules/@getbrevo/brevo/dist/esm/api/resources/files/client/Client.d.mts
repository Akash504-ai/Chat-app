import type { BaseClientOptions, BaseRequestOptions } from "../../../../BaseClient.mjs";
import { type NormalizedClientOptionsWithAuth } from "../../../../BaseClient.mjs";
import * as core from "../../../../core/index.mjs";
import * as Brevo from "../../../index.mjs";
export declare namespace FilesClient {
    type Options = BaseClientOptions;
    interface RequestOptions extends BaseRequestOptions {
    }
}
export declare class FilesClient {
    protected readonly _options: NormalizedClientOptionsWithAuth<FilesClient.Options>;
    constructor(options: FilesClient.Options);
    /**
     * @param {Brevo.GetCrmFilesRequest} request
     * @param {FilesClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.files.getAllFiles()
     */
    getAllFiles(request?: Brevo.GetCrmFilesRequest, requestOptions?: FilesClient.RequestOptions): core.HttpResponsePromise<Brevo.FileData[]>;
    private __getAllFiles;
    /**
     * @param {Brevo.PostCrmFilesRequest} request
     * @param {FilesClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     import { createReadStream } from "fs";
     *     await client.files.uploadAFile({
     *         file: fs.createReadStream("/path/to/your/file")
     *     })
     */
    uploadAFile(request: Brevo.PostCrmFilesRequest, requestOptions?: FilesClient.RequestOptions): core.HttpResponsePromise<Brevo.FileData>;
    private __uploadAFile;
    /**
     * @param {Brevo.GetCrmFilesIdRequest} request
     * @param {FilesClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.files.downloadAFile({
     *         id: "id"
     *     })
     */
    downloadAFile(request: Brevo.GetCrmFilesIdRequest, requestOptions?: FilesClient.RequestOptions): core.HttpResponsePromise<Brevo.GetCrmFilesIdResponse>;
    private __downloadAFile;
    /**
     * @param {Brevo.DeleteCrmFilesIdRequest} request
     * @param {FilesClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.files.deleteAFile({
     *         id: "id"
     *     })
     */
    deleteAFile(request: Brevo.DeleteCrmFilesIdRequest, requestOptions?: FilesClient.RequestOptions): core.HttpResponsePromise<void>;
    private __deleteAFile;
    /**
     * @param {Brevo.GetCrmFilesIdDataRequest} request
     * @param {FilesClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.files.getFileDetails({
     *         id: "id"
     *     })
     */
    getFileDetails(request: Brevo.GetCrmFilesIdDataRequest, requestOptions?: FilesClient.RequestOptions): core.HttpResponsePromise<Brevo.FileData>;
    private __getFileDetails;
}
