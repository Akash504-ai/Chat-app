import type { BaseClientOptions, BaseRequestOptions } from "../../../../BaseClient.js";
import { type NormalizedClientOptionsWithAuth } from "../../../../BaseClient.js";
import * as core from "../../../../core/index.js";
import * as Brevo from "../../../index.js";
export declare namespace UserClient {
    type Options = BaseClientOptions;
    interface RequestOptions extends BaseRequestOptions {
    }
}
export declare class UserClient {
    protected readonly _options: NormalizedClientOptionsWithAuth<UserClient.Options>;
    constructor(options: UserClient.Options);
    /**
     * @param {UserClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.user.getInvitedUsersList()
     */
    getInvitedUsersList(requestOptions?: UserClient.RequestOptions): core.HttpResponsePromise<Brevo.GetInvitedUsersListResponse>;
    private __getInvitedUsersList;
    /**
     * @param {Brevo.PutRevokeUserPermissionRequest} request
     * @param {UserClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.ForbiddenError}
     *
     * @example
     *     await client.user.putRevokeUserPermission({
     *         email: "email"
     *     })
     */
    putRevokeUserPermission(request: Brevo.PutRevokeUserPermissionRequest, requestOptions?: UserClient.RequestOptions): core.HttpResponsePromise<Brevo.PutRevokeUserPermissionResponse>;
    private __putRevokeUserPermission;
    /**
     * `Feature` - A Feature represents a specific functionality like Email
     * campaign, Deals, Calls, Automations, etc. on Brevo. While inviting a user,
     * determine which feature you want to manage access to. You must specify the
     * feature accurately to avoid errors. `Permission` - A Permission defines the
     * level of access or control a user has over a specific feature. While
     * inviting user, decide on the permission level required for the selected
     * feature. Make sure the chosen permission is related to the selected feature.
     * Features and their respective permissions are as below: - `email_campaigns`:
     *   - "create_edit_delete"
     *   - "send_schedule_suspend"
     * - `sms_campaigns`:
     *   - "create_edit_delete"
     *   - "send_schedule_suspend"
     * - `contacts`:
     *   - "view"
     *   - "create_edit_delete"
     *   - "import"
     *   - "export"
     *   - "list_and_attributes"
     *   - "forms"
     * - `templates`:
     *   - "create_edit_delete"
     *   - "activate_deactivate"
     * - `workflows`:
     *   - "create_edit_delete"
     *   - "activate_deactivate_pause"
     *   - "settings"
     * - `landing_pages`:
     *   - "all"
     * - `transactional_emails`:
     *   - "settings"
     *   - "logs"
     * - `smtp_api`:
     *   - "smtp"
     *   - "api_keys"
     *   - "authorized_ips"
     * - `user_management`:
     *   - "all"
     * - `sales_platform`:
     *   - "create_edit_deals"
     *   - "delete_deals"
     *   - "manage_others_deals_tasks"
     *   - "reports"
     *   - "settings"
     * - `phone`:
     *   - "all"
     * - `conversations`:
     *   - "access"
     *   - "assign"
     *   - "configure"
     * - `senders_domains_dedicated_ips`:
     *   - "senders_management"
     *   - "domains_management"
     *   - "dedicated_ips_management"
     * - `push_notifications`:
     *   - "view"
     *   - "create_edit_delete"
     *   - "send"
     *   - "settings"
     * - `companies`:
     *   - "manage_owned_companies"
     *   - "manage_other_companies"
     *   - "settings"
     * **Note**: - If `all_features_access: false` then only privileges are
     * required otherwise if `true` then it's assumed that all permissions will be
     * there for the invited user. - The availability of feature and its permission
     * depends on your current plan. Please select the features and permissions
     * accordingly.
     *
     * @param {Brevo.Inviteuser} request
     * @param {UserClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.user.inviteuser({
     *         all_features_access: true,
     *         email: "inviteuser@example.com",
     *         privileges: [{}]
     *     })
     */
    inviteuser(request: Brevo.Inviteuser, requestOptions?: UserClient.RequestOptions): core.HttpResponsePromise<Brevo.InviteuserResponse>;
    private __inviteuser;
    /**
     * @param {Brevo.PutresendcancelinvitationRequest} request
     * @param {UserClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.ForbiddenError}
     *
     * @example
     *     await client.user.putresendcancelinvitation({
     *         action: "resend",
     *         email: "email"
     *     })
     */
    putresendcancelinvitation(request: Brevo.PutresendcancelinvitationRequest, requestOptions?: UserClient.RequestOptions): core.HttpResponsePromise<Brevo.PutresendcancelinvitationResponse>;
    private __putresendcancelinvitation;
    /**
     * `Feature` - A Feature represents a specific functionality like Email
     * campaign, Deals, Calls, Automations, etc. on Brevo. While inviting a user,
     * determine which feature you want to manage access to. You must specify the
     * feature accurately to avoid errors. `Permission` - A Permission defines the
     * level of access or control a user has over a specific feature. While
     * inviting user, decide on the permission level required for the selected
     * feature. Make sure the chosen permission is related to the selected feature.
     * Features and their respective permissions are as below: - `email_campaigns`:
     *   - "create_edit_delete"
     *   - "send_schedule_suspend"
     * - `sms_campaigns`:
     *   - "create_edit_delete"
     *   - "send_schedule_suspend"
     * - `contacts`:
     *   - "view"
     *   - "create_edit_delete"
     *   - "import"
     *   - "export"
     *   - "list_and_attributes"
     *   - "forms"
     * - `templates`:
     *   - "create_edit_delete"
     *   - "activate_deactivate"
     * - `workflows`:
     *   - "create_edit_delete"
     *   - "activate_deactivate_pause"
     *   - "settings"
     * - `landing_pages`:
     *   - "all"
     * - `transactional_emails`:
     *   - "settings"
     *   - "logs"
     * - `smtp_api`:
     *   - "smtp"
     *   - "api_keys"
     *   - "authorized_ips"
     * - `user_management`:
     *   - "all"
     * - `sales_platform`:
     *   - "create_edit_deals"
     *   - "delete_deals"
     *   - "manage_others_deals_tasks"
     *   - "reports"
     *   - "settings"
     * - `phone`:
     *   - "all"
     * - `conversations`:
     *   - "access"
     *   - "assign"
     *   - "configure"
     * - `senders_domains_dedicated_ips`:
     *   - "senders_management"
     *   - "domains_management"
     *   - "dedicated_ips_management"
     * - `push_notifications`:
     *   - "view"
     *   - "create_edit_delete"
     *   - "send"
     *   - "settings"
     * - `companies`:
     *   - "manage_owned_companies"
     *   - "manage_other_companies"
     *   - "settings"
     * **Note**: - The privileges array remains the same as in the send invitation;
     * the user simply needs to provide the permissions that need to be updated. -
     * The availability of feature and its permission depends on your current plan.
     * Please select the features and permissions accordingly.
     *
     * @param {Brevo.Inviteuser} request
     * @param {UserClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.user.editUserPermission({
     *         all_features_access: true,
     *         email: "inviteuser@example.com",
     *         privileges: [{}]
     *     })
     */
    editUserPermission(request: Brevo.Inviteuser, requestOptions?: UserClient.RequestOptions): core.HttpResponsePromise<Brevo.EditUserPermissionResponse>;
    private __editUserPermission;
    /**
     * @param {Brevo.GetUserPermissionRequest} request
     * @param {UserClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.user.getUserPermission({
     *         email: "email"
     *     })
     */
    getUserPermission(request: Brevo.GetUserPermissionRequest, requestOptions?: UserClient.RequestOptions): core.HttpResponsePromise<Brevo.GetUserPermissionResponse>;
    private __getUserPermission;
}
