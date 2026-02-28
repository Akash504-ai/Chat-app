import type * as Brevo from "../../../../index.js";
/**
 * @example
 *     {
 *         attributeCategory: "normal",
 *         attributeName: "attributeName"
 *     }
 */
export interface CreateAttributeRequest {
    /** Category of the attribute */
    attributeCategory: Brevo.CreateAttributeRequestAttributeCategory;
    /** Name of the attribute */
    attributeName: string;
    /** List of values and labels that the attribute can take. **Use only if the attribute's category is "category"**. None of the category options can exceed max 200 characters. For example: **[{"value":1, "label":"male"}, {"value":2, "label":"female"}]** */
    enumeration?: CreateAttributeRequest.Enumeration.Item[];
    /** Type of the attribute. **Use only if the attribute's category is 'calculated' or 'global'** */
    isRecurring?: boolean;
    /** List of options you want to add for multiple-choice attribute. **Use only if the attribute's category is "normal" and attribute's type is "multiple-choice". None of the multicategory options can exceed max 200 characters.** For example: **["USA","INDIA"]** */
    multiCategoryOptions?: string[];
    /** Type of the attribute. **Use only if the attribute's category is 'normal', 'category' or 'transactional'** Type **user and multiple-choice** is only available if the category is **normal** attribute Type **id** is only available if the category is **transactional** attribute Type **category** is only available if the category is **category** attribute */
    type?: CreateAttributeRequest.Type;
    /** Value of the attribute. **Use only if the attribute's category is 'calculated' or 'global'** */
    value?: string;
}
export declare namespace CreateAttributeRequest {
    type Enumeration = Enumeration.Item[];
    namespace Enumeration {
        interface Item {
            /** Label of the value */
            label: string;
            /** Id of the value */
            value: number;
        }
    }
    /** Type of the attribute. **Use only if the attribute's category is 'normal', 'category' or 'transactional'** Type **user and multiple-choice** is only available if the category is **normal** attribute Type **id** is only available if the category is **transactional** attribute Type **category** is only available if the category is **category** attribute */
    const Type: {
        readonly Text: "text";
        readonly Date: "date";
        readonly Float: "float";
        readonly Boolean: "boolean";
        readonly Id: "id";
        readonly Category: "category";
        readonly MultipleChoice: "multiple-choice";
        readonly User: "user";
    };
    type Type = (typeof Type)[keyof typeof Type];
}
