import type { BaseClientOptions, BaseRequestOptions } from "../../../../BaseClient.js";
import { type NormalizedClientOptionsWithAuth } from "../../../../BaseClient.js";
import * as core from "../../../../core/index.js";
import * as Brevo from "../../../index.js";
export declare namespace NotesClient {
    type Options = BaseClientOptions;
    interface RequestOptions extends BaseRequestOptions {
    }
}
export declare class NotesClient {
    protected readonly _options: NormalizedClientOptionsWithAuth<NotesClient.Options>;
    constructor(options: NotesClient.Options);
    /**
     * @param {Brevo.GetCrmNotesRequest} request
     * @param {NotesClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.notes.getAllNotes()
     */
    getAllNotes(request?: Brevo.GetCrmNotesRequest, requestOptions?: NotesClient.RequestOptions): core.HttpResponsePromise<Brevo.Note[]>;
    private __getAllNotes;
    /**
     * @param {Brevo.NoteData} request
     * @param {NotesClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.UnsupportedMediaTypeError}
     *
     * @example
     *     await client.notes.createANote({
     *         text: "In communication with client_dev for resolution of queries."
     *     })
     */
    createANote(request: Brevo.NoteData, requestOptions?: NotesClient.RequestOptions): core.HttpResponsePromise<Brevo.PostCrmNotesResponse>;
    private __createANote;
    /**
     * @param {Brevo.GetCrmNotesIdRequest} request
     * @param {NotesClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.notes.getANote({
     *         id: "id"
     *     })
     */
    getANote(request: Brevo.GetCrmNotesIdRequest, requestOptions?: NotesClient.RequestOptions): core.HttpResponsePromise<Brevo.Note>;
    private __getANote;
    /**
     * @param {Brevo.DeleteCrmNotesIdRequest} request
     * @param {NotesClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.notes.deleteANote({
     *         id: "id"
     *     })
     */
    deleteANote(request: Brevo.DeleteCrmNotesIdRequest, requestOptions?: NotesClient.RequestOptions): core.HttpResponsePromise<void>;
    private __deleteANote;
    /**
     * @param {Brevo.PatchCrmNotesIdRequest} request
     * @param {NotesClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     * @throws {@link Brevo.UnsupportedMediaTypeError}
     *
     * @example
     *     await client.notes.updateANote({
     *         id: "id",
     *         body: {
     *             text: "In communication with client_dev for resolution of queries."
     *         }
     *     })
     */
    updateANote(request: Brevo.PatchCrmNotesIdRequest, requestOptions?: NotesClient.RequestOptions): core.HttpResponsePromise<void>;
    private __updateANote;
}
