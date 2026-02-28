export interface GetDomainConfigurationResponse {
    /** Domain name */
    domain: string;
    /**
     * Status of domain verification (true=verified, false=non
     * verified)
     */
    verified: boolean;
    /**
     * Status of domain authentication (true=authenticated, false=non
     * authenticated)
     */
    authenticated: boolean;
    /** DNS records configuration and status */
    dns_records: GetDomainConfigurationResponse.DnsRecords;
}
export declare namespace GetDomainConfigurationResponse {
    /**
     * DNS records configuration and status
     */
    interface DnsRecords {
        /** Brevo verification code record */
        brevo_code: DnsRecords.BrevoCode;
        /** DKIM authentication record */
        dkim_record: DnsRecords.DkimRecord;
        /** DMARC policy record */
        dmarc_record: DnsRecords.DmarcRecord;
    }
    namespace DnsRecords {
        /**
         * Brevo verification code record
         */
        interface BrevoCode {
            /** DNS record hostname */
            host_name: string;
            /** DNS record type */
            type: string;
            /** DNS record value */
            value: string;
            /** Whether the record is properly configured */
            status: boolean;
        }
        /**
         * DKIM authentication record
         */
        interface DkimRecord {
            /** DNS record hostname */
            host_name: string;
            /** DNS record type */
            type: string;
            /** DNS record value */
            value: string;
            /** Whether the record is properly configured */
            status: boolean;
        }
        /**
         * DMARC policy record
         */
        interface DmarcRecord {
            /** DNS record hostname */
            host_name: string;
            /** DNS record type */
            type: string;
            /** DNS record value */
            value: string;
            /** Whether the record is properly configured */
            status: boolean;
        }
    }
}
