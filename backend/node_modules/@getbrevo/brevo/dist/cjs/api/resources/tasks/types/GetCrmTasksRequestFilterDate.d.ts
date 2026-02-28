export declare const GetCrmTasksRequestFilterDate: {
    readonly Overdue: "overdue";
    readonly Today: "today";
    readonly Tomorrow: "tomorrow";
    readonly Week: "week";
    readonly Range: "range";
};
export type GetCrmTasksRequestFilterDate = (typeof GetCrmTasksRequestFilterDate)[keyof typeof GetCrmTasksRequestFilterDate];
