/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	Events = "events",
	Questions = "questions",
	Terms = "terms",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created?: IsoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated?: IsoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated?: IsoDateString
}

export type MfasRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	method: string
	recordRef: string
	updated?: IsoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated?: IsoDateString
}

export type SuperusersRecord = {
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export enum EventsStatusOptions {
	"draft" = "draft",
	"active" = "active",
	"archive" = "archive",
}

export enum EventsTargetAudienceOptions {
	"students" = "students",
	"teachers" = "teachers",
}
export type EventsRecord = {
	created?: IsoDateString
	description?: HTMLString
	earlyAccess?: boolean
	endDate: IsoDateString
	externalUrl?: string
	id: string
	image?: string[]
	lateAccess?: boolean
	questions?: RecordIdString[]
	responseLimit?: number
	serialCumulative?: number
	serialPrefix: string
	startDate: IsoDateString
	status: EventsStatusOptions
	targetAudience: EventsTargetAudienceOptions[]
	terms?: RecordIdString[]
	title: string
	updated?: IsoDateString
	userResponseLimit?: number
}

export enum QuestionsTypeOptions {
	"text" = "text",
	"richtext" = "richtext",
	"email" = "email",
	"phone" = "phone",
	"info" = "info",
	"radio" = "radio",
	"checkbox" = "checkbox",
	"file" = "file",
	"members" = "members",
	"activity" = "activity",
	"budget" = "budget",
}
export type QuestionsRecord<Trules = unknown> = {
	conditional?: boolean
	conditionquestion?: RecordIdString
	conditionvalue?: string
	constrain?: boolean
	created?: IsoDateString
	description?: HTMLString
	id: string
	max: number
	min?: number
	required?: boolean
	rules?: null | Trules
	title: HTMLString
	type: QuestionsTypeOptions
	updated?: IsoDateString
}

export type TermsRecord = {
	created?: IsoDateString
	id: string
	updated?: IsoDateString
}

export type UsersRecord = {
	avatar?: string
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	name?: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type EventsResponse<Texpand = unknown> = Required<EventsRecord> & BaseSystemFields<Texpand>
export type QuestionsResponse<Trules = unknown, Texpand = unknown> = Required<QuestionsRecord<Trules>> & BaseSystemFields<Texpand>
export type TermsResponse<Texpand = unknown> = Required<TermsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	events: EventsRecord
	questions: QuestionsRecord
	terms: TermsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	events: EventsResponse
	questions: QuestionsResponse
	terms: TermsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
	collection(idOrName: '_mfas'): RecordService<MfasResponse>
	collection(idOrName: '_otps'): RecordService<OtpsResponse>
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
	collection(idOrName: 'events'): RecordService<EventsResponse>
	collection(idOrName: 'questions'): RecordService<QuestionsResponse>
	collection(idOrName: 'terms'): RecordService<TermsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
