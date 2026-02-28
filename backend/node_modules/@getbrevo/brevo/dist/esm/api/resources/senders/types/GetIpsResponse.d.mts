export interface GetIpsResponse {
    /**
     * Dedicated IP(s) available on your account. Returns empty array
     * for standard accounts without dedicated IPs.
     */
    ips: GetIpsResponse.Ips.Item[];
}
export declare namespace GetIpsResponse {
    type Ips = Ips.Item[];
    namespace Ips {
        interface Item {
            /** Status of the IP (true=active, false=inactive) */
            active: boolean;
            /** Domain associated to the IP */
            domain: string;
            /** ID of the dedicated IP */
            id: number;
            /** Dedicated IP address */
            ip: string;
        }
    }
}
