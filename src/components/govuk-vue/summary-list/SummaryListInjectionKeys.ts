import type { InjectionKey, Ref } from 'vue'

export const SummaryListRegisterCardActionFunctionInjectionKey: InjectionKey<Function> = Symbol(
  'SummaryListRegisterCardActionFunction'
)

export const SummaryListUnregisterCardActionFunctionInjectionKey: InjectionKey<Function> = Symbol(
  'SummaryListUnregisterCardActionFunction'
)

export const SummaryListCardActionsCountInjectionKey: InjectionKey<Ref<number>> = Symbol(
  'SummaryListCardActionsCount'
)

export const SummaryListRegisterRowFunctionInjectionKey: InjectionKey<Function> = Symbol(
  'SummaryListRegisterRowActionFunction'
)

export const SummaryListUnregisterRowFunctionInjectionKey: InjectionKey<Function> = Symbol(
  'SummaryListUnregisterRowActionFunction'
)

export const SummaryListAnyRowHasActionsInjectionKey: InjectionKey<Ref<boolean>> = Symbol(
  'SummaryListAnyRowHasActions'
)


export const SummaryListRegisterRowActionFunctionInjectionKey: InjectionKey<Function> = Symbol(
  'SummaryListRegisterRowActionFunction'
)

export const SummaryListUnregisterRowActionFunctionInjectionKey: InjectionKey<Function> = Symbol(
  'SummaryListUnregisterRowActionFunction'
)

export const SummaryListRowActionsCountInjectionKey: InjectionKey<Ref<number>> = Symbol(
  'SummaryListRowActionsCount'
)
