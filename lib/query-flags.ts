type SearchParamValue = string | string[] | undefined;

export type SearchParams = Record<string, SearchParamValue>;

const enabledParamValues = new Set(["1", "true", "yes", "on"]);

export function isQueryFlagEnabled(value: SearchParamValue) {
  const firstValue = Array.isArray(value) ? value[0] : value;

  return firstValue ? enabledParamValues.has(firstValue.toLowerCase()) : false;
}

export function shouldShowXCollective(params: SearchParams = {}) {
  return (
    isQueryFlagEnabled(params.xcollective) ||
    isQueryFlagEnabled(params["x-collective"]) ||
    isQueryFlagEnabled(params.collective)
  );
}
