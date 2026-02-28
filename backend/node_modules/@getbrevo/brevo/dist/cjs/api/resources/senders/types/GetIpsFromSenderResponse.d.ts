export interface GetIpsFromSenderResponse {
    /**
     * Dedicated IP(s) linked to a sender. Returns empty array for standard accounts
     * without dedicated IPs.
     */
    ips: GetIpsFromSenderResponse.Ips.Item[];
}
export declare namespace GetIpsFromSenderResponse {
    type Ips = Ips.Item[];
    namespace Ips {
        interface Item {
            /** Domain associated to the IP */
            domain: string;
            /** ID of the dedicated IP */
            id: number;
            /** Dedicated IP address */
            ip: string;
            /** Weight of the IP for this sender */
            weight: number;
        }
    }
}
