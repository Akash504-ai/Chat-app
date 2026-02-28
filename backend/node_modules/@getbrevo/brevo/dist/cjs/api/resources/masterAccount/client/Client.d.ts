import type { BaseClientOptions, BaseRequestOptions } from "../../../../BaseClient.js";
import { type NormalizedClientOptionsWithAuth } from "../../../../BaseClient.js";
import * as core from "../../../../core/index.js";
import * as Brevo from "../../../index.js";
export declare namespace MasterAccountClient {
    type Options = BaseClientOptions;
    interface RequestOptions extends BaseRequestOptions {
    }
}
export declare class MasterAccountClient {
    protected readonly _options: NormalizedClientOptionsWithAuth<MasterAccountClient.Options>;
    constructor(options: MasterAccountClient.Options);
    /**
     * This endpoint allows to create a group of sub-accounts
     *
     * @param {Brevo.PostCorporateGroupRequest} request
     * @param {MasterAccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.masterAccount.createANewGroupOfSubAccounts({
     *         groupName: "My group"
     *     })
     */
    createANewGroupOfSubAccounts(request: Brevo.PostCorporateGroupRequest, requestOptions?: MasterAccountClient.RequestOptions): core.HttpResponsePromise<Brevo.PostCorporateGroupResponse>;
    private __createANewGroupOfSubAccounts;
    /**
     * This endpoint allows you to remove a sub-organization from a group.
     *
     * @param {Brevo.PutCorporateGroupUnlinkGroupIdSubAccountsRequest} request
     * @param {MasterAccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.masterAccount.deleteSubAccountFromGroup({
     *         groupId: "groupId",
     *         subAccountIds: [423432, 234323, 87678]
     *     })
     */
    deleteSubAccountFromGroup(request: Brevo.PutCorporateGroupUnlinkGroupIdSubAccountsRequest, requestOptions?: MasterAccountClient.RequestOptions): core.HttpResponsePromise<void>;
    private __deleteSubAccountFromGroup;
    /**
     * This endpoint allows you to retrieve a specific group’s information such as
     * the list of sub-organizations and the user associated with the group.
     *
     * @param {Brevo.GetCorporateGroupIdRequest} request
     * @param {MasterAccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.masterAccount.getAGroupDetails({
     *         id: "id"
     *     })
     */
    getAGroupDetails(request: Brevo.GetCorporateGroupIdRequest, requestOptions?: MasterAccountClient.RequestOptions): core.HttpResponsePromise<Brevo.GetCorporateGroupIdResponse>;
    private __getAGroupDetails;
    /**
     * This endpoint allows to update a group of sub-accounts
     *
     * @param {Brevo.PutCorporateGroupIdRequest} request
     * @param {MasterAccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.masterAccount.updateAGroupOfSubAccounts({
     *         id: "id"
     *     })
     */
    updateAGroupOfSubAccounts(request: Brevo.PutCorporateGroupIdRequest, requestOptions?: MasterAccountClient.RequestOptions): core.HttpResponsePromise<void>;
    private __updateAGroupOfSubAccounts;
    /**
     * This endpoint allows you to delete a group of sub-organizations. When a
     * group is deleted, the sub-organizations are no longer part of this group.
     * The users associated with the group are no longer associated with the group
     * once deleted.
     *
     * @param {Brevo.DeleteCorporateGroupIdRequest} request
     * @param {MasterAccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.masterAccount.deleteAGroup({
     *         id: "id"
     *     })
     */
    deleteAGroup(request: Brevo.DeleteCorporateGroupIdRequest, requestOptions?: MasterAccountClient.RequestOptions): core.HttpResponsePromise<void>;
    private __deleteAGroup;
    /**
     * This endpoint allows you to list all groups created on your Admin account.
     *
     * @param {MasterAccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.masterAccount.getSubAccountGroups()
     */
    getSubAccountGroups(requestOptions?: MasterAccountClient.RequestOptions): core.HttpResponsePromise<Brevo.GetSubAccountGroupsResponseItem[]>;
    private __getSubAccountGroups;
    /**
     * This endpoint allows you to list all Admin users of your Admin account. You
     * can filter users by type (active or pending) and paginate results using
     * offset and limit.
     *
     * @param {Brevo.GetCorporateInvitedUsersListRequest} request
     * @param {MasterAccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.masterAccount.getCorporateInvitedUsersList()
     */
    getCorporateInvitedUsersList(request?: Brevo.GetCorporateInvitedUsersListRequest, requestOptions?: MasterAccountClient.RequestOptions): core.HttpResponsePromise<Brevo.GetCorporateInvitedUsersListResponse>;
    private __getCorporateInvitedUsersList;
    /**
     * This endpoint allows you to retrieve the list of active IPs on your Admin
     * account
     *
     * @param {MasterAccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.masterAccount.listOfAllIPs()
     */
    listOfAllIPs(requestOptions?: MasterAccountClient.RequestOptions): core.HttpResponsePromise<Brevo.GetCorporateIpResponseItem[]>;
    private __listOfAllIPs;
    /**
     * This endpoint will provide the details of the master account.
     *
     * @param {MasterAccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.masterAccount.getTheDetailsOfRequestedMasterAccount()
     */
    getTheDetailsOfRequestedMasterAccount(requestOptions?: MasterAccountClient.RequestOptions): core.HttpResponsePromise<Brevo.GetCorporateMasterAccountResponse>;
    private __getTheDetailsOfRequestedMasterAccount;
    /**
     * This endpoint generates an SSO token to authenticate and access the admin
     * account using the endpoint
     * https://account-app.brevo.com/account/login/corporate/sso/[token], where
     * [token] will be replaced by the actual token.
     *
     * @param {Brevo.PostCorporateSsoTokenRequest} request
     * @param {MasterAccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.ForbiddenError}
     *
     * @example
     *     await client.masterAccount.generateSsoTokenToAccessAdminAccount({
     *         email: "vipin+ent-user@brevo.com"
     *     })
     */
    generateSsoTokenToAccessAdminAccount(request: Brevo.PostCorporateSsoTokenRequest, requestOptions?: MasterAccountClient.RequestOptions): core.HttpResponsePromise<Brevo.GetSsoToken>;
    private __generateSsoTokenToAccessAdminAccount;
    /**
     * This endpoint will provide the list all the sub-accounts of the master
     * account.
     *
     * @param {Brevo.GetCorporateSubAccountRequest} request
     * @param {MasterAccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.masterAccount.getTheListOfAllTheSubAccountsOfTheMasterAccount({
     *         offset: 1,
     *         limit: 1
     *     })
     */
    getTheListOfAllTheSubAccountsOfTheMasterAccount(request: Brevo.GetCorporateSubAccountRequest, requestOptions?: MasterAccountClient.RequestOptions): core.HttpResponsePromise<Brevo.GetCorporateSubAccountResponse>;
    private __getTheListOfAllTheSubAccountsOfTheMasterAccount;
    /**
     * This endpoint will create a new sub-account under a master account
     *
     * @param {Brevo.PostCorporateSubAccountRequest} request
     * @param {MasterAccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.masterAccount.createANewSubAccountUnderAMasterAccount({
     *         companyName: "Test Sub-account",
     *         email: "test-sub@example.com",
     *         groupIds: ["5f8f8c3b5f56a02d4433b3a7", "5f8f8c3b5f56a02d4433b3a8"],
     *         language: "fr",
     *         timezone: "Europe/Paris"
     *     })
     */
    createANewSubAccountUnderAMasterAccount(request: Brevo.PostCorporateSubAccountRequest, requestOptions?: MasterAccountClient.RequestOptions): core.HttpResponsePromise<Brevo.PostCorporateSubAccountResponse>;
    private __createANewSubAccountUnderAMasterAccount;
    /**
     * This endpoint allows to associate an IP to sub-accounts
     *
     * @param {Brevo.PostCorporateSubAccountIpAssociateRequest} request
     * @param {MasterAccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.masterAccount.associateAnIpToSubAccounts({
     *         ids: [234322, 325553, 893432],
     *         ip: "103.11.32.88"
     *     })
     */
    associateAnIpToSubAccounts(request: Brevo.PostCorporateSubAccountIpAssociateRequest, requestOptions?: MasterAccountClient.RequestOptions): core.HttpResponsePromise<Record<string, unknown>>;
    private __associateAnIpToSubAccounts;
    /**
     * This endpoint allows to dissociate an IP from sub-accounts
     *
     * @param {Brevo.PutCorporateSubAccountIpDissociateRequest} request
     * @param {MasterAccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.masterAccount.dissociateAnIpToSubAccounts({
     *         ids: [234322, 325553, 893432],
     *         ip: "103.11.32.88"
     *     })
     */
    dissociateAnIpToSubAccounts(request: Brevo.PutCorporateSubAccountIpDissociateRequest, requestOptions?: MasterAccountClient.RequestOptions): core.HttpResponsePromise<void>;
    private __dissociateAnIpToSubAccounts;
    /**
     * This endpoint will generate an API v3 key for a sub-account
     *
     * @param {Brevo.PostCorporateSubAccountKeyRequest} request
     * @param {MasterAccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.masterAccount.createAnApiKeyForASubAccount({
     *         id: 3232323,
     *         name: "My Api Key"
     *     })
     */
    createAnApiKeyForASubAccount(request: Brevo.PostCorporateSubAccountKeyRequest, requestOptions?: MasterAccountClient.RequestOptions): core.HttpResponsePromise<Brevo.PostCorporateSubAccountKeyResponse>;
    private __createAnApiKeyForASubAccount;
    /**
     * This endpoint generates an sso token to authenticate and access a
     * sub-account of the master using the account endpoint
     * https://account-app.brevo.com/account/login/sub-account/sso/[token], where
     * [token] will be replaced by the actual token.
     *
     * @param {Brevo.PostCorporateSubAccountSsoTokenRequest} request
     * @param {MasterAccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.ForbiddenError}
     *
     * @example
     *     await client.masterAccount.generateSsoTokenToAccessSubAccount({
     *         id: 3232323
     *     })
     */
    generateSsoTokenToAccessSubAccount(request: Brevo.PostCorporateSubAccountSsoTokenRequest, requestOptions?: MasterAccountClient.RequestOptions): core.HttpResponsePromise<Brevo.GetSsoToken>;
    private __generateSsoTokenToAccessSubAccount;
    /**
     * This endpoint will provide the details for the specified sub-account company
     *
     * @param {Brevo.GetCorporateSubAccountIdRequest} request
     * @param {MasterAccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.masterAccount.getSubAccountDetails({
     *         id: 1000000
     *     })
     */
    getSubAccountDetails(request: Brevo.GetCorporateSubAccountIdRequest, requestOptions?: MasterAccountClient.RequestOptions): core.HttpResponsePromise<Brevo.GetCorporateSubAccountIdResponse>;
    private __getSubAccountDetails;
    /**
     * @param {Brevo.DeleteCorporateSubAccountIdRequest} request
     * @param {MasterAccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.masterAccount.deleteASubAccount({
     *         id: 1000000
     *     })
     */
    deleteASubAccount(request: Brevo.DeleteCorporateSubAccountIdRequest, requestOptions?: MasterAccountClient.RequestOptions): core.HttpResponsePromise<void>;
    private __deleteASubAccount;
    /**
     * API endpoint for the Corporate owner to enable/disable applications on the
     * sub-account
     *
     * @param {Brevo.PutCorporateSubAccountIdApplicationsToggleRequest} request
     * @param {MasterAccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.ForbiddenError}
     *
     * @example
     *     await client.masterAccount.enableDisableSubAccountApplicationS({
     *         id: 1000000,
     *         "landing-pages": true,
     *         meetings: true,
     *         "sms-campaigns": false,
     *         "web-push": false,
     *         whatsapp: true
     *     })
     */
    enableDisableSubAccountApplicationS(request: Brevo.PutCorporateSubAccountIdApplicationsToggleRequest, requestOptions?: MasterAccountClient.RequestOptions): core.HttpResponsePromise<void>;
    private __enableDisableSubAccountApplicationS;
    /**
     * This endpoint will update the sub-account plan. On the Corporate solution
     * new version v2, you can set an unlimited number of credits in your
     * sub-organization. Please pass the value “-1" to set the consumable in
     * unlimited mode.
     *
     * @param {Brevo.PutCorporateSubAccountIdPlanRequest} request
     * @param {MasterAccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.ForbiddenError}
     *
     * @example
     *     await client.masterAccount.updateSubAccountPlan({
     *         id: 1000000,
     *         credits: {
     *             email: 5000,
     *             externalFeeds: 1,
     *             sms: 2000,
     *             whatsapp: 100,
     *             wpSubscribers: -1
     *         },
     *         features: {
     *             inbox: 10,
     *             landingPage: 20,
     *             salesUsers: 6,
     *             users: 15
     *         }
     *     })
     */
    updateSubAccountPlan(request: Brevo.PutCorporateSubAccountIdPlanRequest, requestOptions?: MasterAccountClient.RequestOptions): core.HttpResponsePromise<void>;
    private __updateSubAccountPlan;
    /**
     * This endpoint will update multiple sub-accounts plan. On the Corporate
     * solution new version v2, you can set an unlimited number of credits in your
     * sub-organization. Please pass the value “-1" to set the consumable in
     * unlimited mode.
     *
     * @param {Brevo.PutCorporateSubAccountsPlanRequest} request
     * @param {MasterAccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.ForbiddenError}
     *
     * @example
     *     await client.masterAccount.updateSubAccountsPlan({
     *         credits: {
     *             email: 5000,
     *             externalFeeds: 1,
     *             sms: 2000,
     *             whatsapp: 100,
     *             wpSubscribers: -1
     *         },
     *         features: {
     *             landingPage: 20,
     *             salesUsers: 6,
     *             users: 15
     *         },
     *         subAccountIds: [4534345, 987893, 876785]
     *     })
     */
    updateSubAccountsPlan(request?: Brevo.PutCorporateSubAccountsPlanRequest, requestOptions?: MasterAccountClient.RequestOptions): core.HttpResponsePromise<void>;
    private __updateSubAccountsPlan;
    /**
     * `This endpoint allows you to invite a member to manage the Admin account
     * Features and their respective permissions are as below: - `my_plan`:
     *   - "all"
     * - `api`:
     *   - "none"
     * - `user_management`:
     *   - "all"
     * - `app_management` | Not available in ENTv2:
     *   - "all"
     * - `sub_organization_groups`
     *   - "create"
     *   - "edit_delete"
     * - `create_sub_organizations`
     *   - "all"
     * - `manage_sub_organizations`
     *   - "all"
     * - `analytics`
     *   - "download_data"
     *   - "create_alerts"
     *   - "my_looks"
     *   - "explore_create"
     * - `security`
     *   - "all"
     * **Note**: - If `all_features_access: false` then only privileges are
     * required otherwise if `true` then it's assumed that all permissions will be
     * there for the invited admin user.
     *
     * @param {Brevo.InviteAdminUserRequest} request
     * @param {MasterAccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.masterAccount.inviteAdminUser({
     *         all_features_access: true,
     *         email: "inviteuser@example.com",
     *         privileges: [{}]
     *     })
     */
    inviteAdminUser(request: Brevo.InviteAdminUserRequest, requestOptions?: MasterAccountClient.RequestOptions): core.HttpResponsePromise<Brevo.InviteAdminUserResponse>;
    private __inviteAdminUser;
    /**
     * This endpoint will allow the user to:
     * - Resend an admin user invitation
     * - Cancel an admin user invitation
     *
     * @param {Brevo.PutCorporateUserInvitationActionEmailRequest} request
     * @param {MasterAccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.masterAccount.resendCancelAdminUserInvitation({
     *         action: "resend",
     *         email: "email"
     *     })
     */
    resendCancelAdminUserInvitation(request: Brevo.PutCorporateUserInvitationActionEmailRequest, requestOptions?: MasterAccountClient.RequestOptions): core.HttpResponsePromise<Brevo.PutCorporateUserInvitationActionEmailResponse>;
    private __resendCancelAdminUserInvitation;
    /**
     * This endpoint allows to revoke/remove an invited member of your Admin
     * account
     *
     * @param {Brevo.DeleteCorporateUserRevokeEmailRequest} request
     * @param {MasterAccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.masterAccount.revokeAnAdminUser({
     *         email: "email"
     *     })
     */
    revokeAnAdminUser(request: Brevo.DeleteCorporateUserRevokeEmailRequest, requestOptions?: MasterAccountClient.RequestOptions): core.HttpResponsePromise<void>;
    private __revokeAnAdminUser;
    /**
     * This endpoint will provide the list of admin user permissions
     *
     * @param {Brevo.GetCorporateUserPermissionRequest} request
     * @param {MasterAccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.masterAccount.getCorporateUserPermission({
     *         email: "email"
     *     })
     */
    getCorporateUserPermission(request: Brevo.GetCorporateUserPermissionRequest, requestOptions?: MasterAccountClient.RequestOptions): core.HttpResponsePromise<Brevo.GetCorporateUserPermissionResponse>;
    private __getCorporateUserPermission;
    /**
     * This endpoint will allow you to change the permissions of Admin users of
     * your Admin account
     *
     * @param {Brevo.PutCorporateUserEmailPermissionsRequest} request
     * @param {MasterAccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.masterAccount.changeAdminUserPermissions({
     *         email: "email",
     *         all_features_access: false,
     *         privileges: [{
     *                 feature: "user_management",
     *                 permissions: ["all"]
     *             }, {
     *                 feature: "api",
     *                 permissions: ["all"]
     *             }, {
     *                 feature: "my_plan",
     *                 permissions: ["none"]
     *             }, {
     *                 feature: "apps_management",
     *                 permissions: ["all"]
     *             }, {
     *                 feature: "create_sub_organizations",
     *                 permissions: ["all"]
     *             }, {
     *                 feature: "sub_organization_groups",
     *                 permissions: ["create", "edit_delete"]
     *             }, {
     *                 feature: "manage_sub_organizations",
     *                 permissions: ["all"]
     *             }, {
     *                 feature: "security",
     *                 permissions: ["none"]
     *             }, {
     *                 feature: "analytics",
     *                 permissions: ["create_alerts", "download_data", "my_looks", "explore_create"]
     *             }]
     *     })
     */
    changeAdminUserPermissions(request: Brevo.PutCorporateUserEmailPermissionsRequest, requestOptions?: MasterAccountClient.RequestOptions): core.HttpResponsePromise<void>;
    private __changeAdminUserPermissions;
}
