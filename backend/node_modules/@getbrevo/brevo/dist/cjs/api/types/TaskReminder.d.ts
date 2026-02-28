/**
 * Task reminder date/time for a task
 */
export interface TaskReminder {
    /** Type of task reminder e.g email, push */
    types: TaskReminder.Types.Item[];
    /** Unit of time before reminder is to be sent */
    unit: TaskReminder.Unit;
    /** Value of time unit before reminder is to be sent */
    value: number;
}
export declare namespace TaskReminder {
    type Types = Types.Item[];
    namespace Types {
        const Item: {
            readonly Email: "email";
            readonly Push: "push";
        };
        type Item = (typeof Item)[keyof typeof Item];
    }
    /** Unit of time before reminder is to be sent */
    const Unit: {
        readonly Minutes: "minutes";
        readonly Hours: "hours";
        readonly Weeks: "weeks";
        readonly Days: "days";
    };
    type Unit = (typeof Unit)[keyof typeof Unit];
}
