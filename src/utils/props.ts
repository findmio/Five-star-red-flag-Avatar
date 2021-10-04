import { assign, assignWith, isUndefined } from 'lodash';

export function mergeProps<P, D>(defaultProps: D, props: P): P & D {
  function customizer(objValue: any, srcValue: any) {
    return isUndefined(srcValue) ? objValue : srcValue
  }
  return assignWith(assign({}, defaultProps), props, customizer)
}
