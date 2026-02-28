/**
 * @example
 *     {
 *         attributeType: "text",
 *         label: "Attribute Label",
 *         objectType: "companies"
 *     }
 */
export interface PostCrmAttributesRequest {
    /** The type of attribute (must be one of the defined enums) */
    attributeType: PostCrmAttributesRequest.AttributeType;
    /** A description of the attribute */
    description?: string;
    /** The label for the attribute (max 50 characters, cannot be empty) */
    label: string;
    /** The type of object the attribute belongs to (prefilled with `companies`, mandatory) */
    objectType: PostCrmAttributesRequest.ObjectType;
    /** Options for multi-choice or single-select attributes */
    optionsLabels?: string[];
}
export declare namespace PostCrmAttributesRequest {
    /** The type of attribute (must be one of the defined enums) */
    const AttributeType: {
        readonly Text: "text";
        readonly User: "user";
        readonly Number: "number";
        readonly SingleSelect: "single-select";
        readonly Date: "date";
        readonly Boolean: "boolean";
        readonly MultiChoice: "multi-choice";
    };
    type AttributeType = (typeof AttributeType)[keyof typeof AttributeType];
    /** The type of object the attribute belongs to (prefilled with `companies`, mandatory) */
    const ObjectType: {
        readonly Companies: "companies";
        readonly Deals: "deals";
    };
    type ObjectType = (typeof ObjectType)[keyof typeof ObjectType];
}
