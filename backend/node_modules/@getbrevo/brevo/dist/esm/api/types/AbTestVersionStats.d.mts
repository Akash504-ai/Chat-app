/**
 * Percentage of a particular event for both versions
 */
export interface AbTestVersionStats {
    /** percentage of an event for version A */
    "Version A": string;
    /** percentage of an event for version B */
    "Version B": string;
}
