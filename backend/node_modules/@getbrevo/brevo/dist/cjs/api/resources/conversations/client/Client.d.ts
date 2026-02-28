import type { BaseClientOptions, BaseRequestOptions } from "../../../../BaseClient.js";
import { type NormalizedClientOptionsWithAuth } from "../../../../BaseClient.js";
import * as core from "../../../../core/index.js";
import * as Brevo from "../../../index.js";
export declare namespace ConversationsClient {
    type Options = BaseClientOptions;
    interface RequestOptions extends BaseRequestOptions {
    }
}
export declare class ConversationsClient {
    protected readonly _options: NormalizedClientOptionsWithAuth<ConversationsClient.Options>;
    constructor(options: ConversationsClient.Options);
    /**
     * We recommend pinging this endpoint every minute for as long as the agent has to be considered online.
     *
     * @param {Brevo.PostConversationsAgentOnlinePingRequest} request
     * @param {ConversationsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.conversations.setsAgentsStatusToOnlineFor23Minutes({
     *         agentId: "d9nKoegKSjmCtyK78"
     *     })
     *
     * @example
     *     await client.conversations.setsAgentsStatusToOnlineFor23Minutes({
     *         agentEmail: "liz@getwear.com",
     *         agentName: "Liz",
     *         receivedFrom: "SuperAwesomeHelpdesk"
     *     })
     */
    setsAgentsStatusToOnlineFor23Minutes(request?: Brevo.PostConversationsAgentOnlinePingRequest, requestOptions?: ConversationsClient.RequestOptions): core.HttpResponsePromise<void>;
    private __setsAgentsStatusToOnlineFor23Minutes;
    /**
     * @param {Brevo.PostConversationsMessagesRequest} request
     * @param {ConversationsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.conversations.sendAMessageAsAnAgent({
     *         agentId: "d9nKoegKSjmCtyK78",
     *         text: "Hello! How can I help you?",
     *         visitorId: "kZMvWhf8npAu3H6qd57w2Hv6nh6rnxvg"
     *     })
     *
     * @example
     *     await client.conversations.sendAMessageAsAnAgent({
     *         agentEmail: "liz@getwear.com",
     *         agentName: "Liz",
     *         receivedFrom: "SuperAwesomeHelpdesk",
     *         text: "Hello! How can I help you?",
     *         visitorId: "kZMvWhf8npAu3H6qd57w2Hv6nh6rnxvg"
     *     })
     *
     * @example
     *     await client.conversations.sendAMessageAsAnAgent({
     *         agentId: "d9nKoegKSjmCtyK78",
     *         receivedFrom: "SuperAwesomeHelpdesk",
     *         text: "Hello! How can I help you?",
     *         visitorId: "kZMvWhf8npAu3H6qd57w2Hv6nh6rnxvg"
     *     })
     */
    sendAMessageAsAnAgent(request: Brevo.PostConversationsMessagesRequest, requestOptions?: ConversationsClient.RequestOptions): core.HttpResponsePromise<Brevo.ConversationsMessage>;
    private __sendAMessageAsAnAgent;
    /**
     * @param {Brevo.GetConversationsMessagesIdRequest} request
     * @param {ConversationsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.conversations.getAMessage({
     *         id: "id"
     *     })
     */
    getAMessage(request: Brevo.GetConversationsMessagesIdRequest, requestOptions?: ConversationsClient.RequestOptions): core.HttpResponsePromise<Brevo.ConversationsMessage>;
    private __getAMessage;
    /**
     * Only agents’ messages can be edited.
     *
     * @param {Brevo.PutConversationsMessagesIdRequest} request
     * @param {ConversationsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.conversations.updateAMessageSentByAnAgent({
     *         id: "id",
     *         text: "Good morning! How can I help you?"
     *     })
     */
    updateAMessageSentByAnAgent(request: Brevo.PutConversationsMessagesIdRequest, requestOptions?: ConversationsClient.RequestOptions): core.HttpResponsePromise<Brevo.ConversationsMessage>;
    private __updateAMessageSentByAnAgent;
    /**
     * Only agents’ messages can be deleted.
     *
     * @param {Brevo.DeleteConversationsMessagesIdRequest} request
     * @param {ConversationsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.conversations.deleteAMessageSentByAnAgent({
     *         id: "id"
     *     })
     */
    deleteAMessageSentByAnAgent(request: Brevo.DeleteConversationsMessagesIdRequest, requestOptions?: ConversationsClient.RequestOptions): core.HttpResponsePromise<void>;
    private __deleteAMessageSentByAnAgent;
    /**
     * Example of automated messages: order status, announce new features in your web app, etc.
     *
     * @param {Brevo.PostConversationsPushedMessagesRequest} request
     * @param {ConversationsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.conversations.sendAnAutomatedMessageToAVisitor({
     *         groupId: "PjRBMhWGen6aRHjif",
     *         text: "Your order has shipped! Here\u2019s your tracking number: 9114 5847 3325 9667 4328 88",
     *         visitorId: "kZMvWhf8npAu3H6qd57w2Hv6nh6rnxvg"
     *     })
     *
     * @example
     *     await client.conversations.sendAnAutomatedMessageToAVisitor({
     *         text: "Your order has shipped! Here\u2019s your tracking number: 9114 5847 3325 9667 4328 88",
     *         visitorId: "kZMvWhf8npAu3H6qd57w2Hv6nh6rnxvg"
     *     })
     *
     * @example
     *     await client.conversations.sendAnAutomatedMessageToAVisitor({
     *         agentId: "d9nKoegKSjmCtyK78",
     *         text: "Your order has shipped! Here\u2019s your tracking number: 9114 5847 3325 9667 4328 88",
     *         visitorId: "kZMvWhf8npAu3H6qd57w2Hv6nh6rnxvg"
     *     })
     */
    sendAnAutomatedMessageToAVisitor(request: Brevo.PostConversationsPushedMessagesRequest, requestOptions?: ConversationsClient.RequestOptions): core.HttpResponsePromise<Brevo.ConversationsMessage>;
    private __sendAnAutomatedMessageToAVisitor;
    /**
     * @param {Brevo.GetConversationsPushedMessagesIdRequest} request
     * @param {ConversationsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.conversations.getAnAutomatedMessage({
     *         id: "id"
     *     })
     */
    getAnAutomatedMessage(request: Brevo.GetConversationsPushedMessagesIdRequest, requestOptions?: ConversationsClient.RequestOptions): core.HttpResponsePromise<Brevo.ConversationsMessage>;
    private __getAnAutomatedMessage;
    /**
     * @param {Brevo.PutConversationsPushedMessagesIdRequest} request
     * @param {ConversationsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.conversations.updateAnAutomatedMessage({
     *         id: "id",
     *         text: "Your order has shipped! Here\u2019s your tracking number: 9114 5847 4668 7775 9233 54"
     *     })
     */
    updateAnAutomatedMessage(request: Brevo.PutConversationsPushedMessagesIdRequest, requestOptions?: ConversationsClient.RequestOptions): core.HttpResponsePromise<Brevo.ConversationsMessage>;
    private __updateAnAutomatedMessage;
    /**
     * @param {Brevo.DeleteConversationsPushedMessagesIdRequest} request
     * @param {ConversationsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.conversations.deleteAnAutomatedMessage({
     *         id: "id"
     *     })
     */
    deleteAnAutomatedMessage(request: Brevo.DeleteConversationsPushedMessagesIdRequest, requestOptions?: ConversationsClient.RequestOptions): core.HttpResponsePromise<void>;
    private __deleteAnAutomatedMessage;
    /**
     * Assigns a visitor to a specific agent group or removes them from their current group.
     *
     * @param {Brevo.PutConversationsVisitorGroupRequest} request
     * @param {ConversationsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.conversations.setVisitorGroupAssignment({
     *         groupId: "PjRBMhWGen6aRHjif"
     *     })
     */
    setVisitorGroupAssignment(request: Brevo.PutConversationsVisitorGroupRequest, requestOptions?: ConversationsClient.RequestOptions): core.HttpResponsePromise<Brevo.PutConversationsVisitorGroupResponse>;
    private __setVisitorGroupAssignment;
}
