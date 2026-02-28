/**
 * Check user permission
 */
export interface GetUserPermissionResponse {
    /** Email address of the user. */
    email: string;
    /** Granular feature permissions given to the user. */
    privileges: GetUserPermissionResponse.Privileges.Item[];
    /** Status of the invited user. */
    status: string;
}
export declare namespace GetUserPermissionResponse {
    type Privileges = Privileges.Item[];
    namespace Privileges {
        interface Item {
            feature: string;
            permissions: string[];
        }
    }
}
