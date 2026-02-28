/**
 * @example
 *     {
 *         attributeType: "multiple-choice",
 *         multipleChoiceAttribute: "multipleChoiceAttribute",
 *         multipleChoiceAttributeOption: "multipleChoiceAttributeOption"
 *     }
 */
export interface DeleteMultiAttributeOptionsRequest {
    /** Type of the attribute */
    attributeType: "multiple-choice";
    /** Name of the existing multiple-choice attribute */
    multipleChoiceAttribute: string;
    /** Name of the existing multiple-choice attribute option that you want to delete */
    multipleChoiceAttributeOption: string;
}
