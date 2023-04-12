const ConflictError = require('./conflict_error');
const ConditionNotMetError = require('./condition_not_met_error');
const ForbiddenError = require('./forbidden_error');
const InternalServerError = require('./internal_server_error');
const NotFoundError = require('./not_found_error');
const UnauthorizedError = require('./unauthorized_error');
const PreconditionFailedError = require('./precondition_failed_error');
const MethodNotAllowedError = require('./method_not_allowed');
const BadRequestError = require('./bad_request_error');
const ServiceUnavailableError= require('./service_unavaiable_error');
const FisikTicketAlreadyExistsError= require('./fisik_ticket_already_exists');
const LogicTicketAlreadyExistsError= require('./logic_ticket_already_exists');
const AdminTicketAlreadyExistsError= require('./admin_ticket_already_exists');
const AcsHasNotResetError= require('./acs_has_not_reset');
const FisikTicketFoundError= require('./fisik_ticket_found');
const MaxAttemptsReachedError= require('./reschedule_max_attempts_reached');
const PendingTicketRequestFoundError= require('./pending_ticket_creation_req_found');
const CannotReopenDraftTicketError= require('./cannot_reopen_draft_ticket');
const TicketIdNotUpdatedError= require('./ticket_id_not_updated');
const GamasIssueError = require('./gamas_issue_error');
const IsolirIssueError = require('./isolir_issue_error');
const OutstandingBillExistsError = require('./outstanding_bill_exists_error');
const TicketActionNotAllowedError = require('./ticket_action_not_allowed_error');
const UnauthorizedAccountAccessError = require('./unauthorized_account_access_error');
const FeatureNotSupportedError = require('./feature_not_supported_error');
const NoTimeSlotsAvailableError = require('./no_time_slots_avaiable_error');
const TempUserError = require('./tempUserError');
const UnavailableForLegalReasonsError = require('./unavailable_for_legal_reasons');
const GamasError = require('./gamas_error');

module.exports = {
    ConflictError,
    ConditionNotMetError,
    ForbiddenError,
    InternalServerError,
    NotFoundError,
    UnauthorizedError,
    PreconditionFailedError,
    MethodNotAllowedError,
    BadRequestError,
    ServiceUnavailableError,
    FisikTicketAlreadyExistsError,
    LogicTicketAlreadyExistsError,
    AdminTicketAlreadyExistsError,
    AcsHasNotResetError,
    FisikTicketFoundError,
    MaxAttemptsReachedError,
    PendingTicketRequestFoundError,
    CannotReopenDraftTicketError,
    TicketIdNotUpdatedError,
    GamasIssueError,
    IsolirIssueError,
    OutstandingBillExistsError,
    TicketActionNotAllowedError,
    UnauthorizedAccountAccessError,
    FeatureNotSupportedError,
    NoTimeSlotsAvailableError,
    TempUserError,
    UnavailableForLegalReasonsError,
    GamasError,
};
