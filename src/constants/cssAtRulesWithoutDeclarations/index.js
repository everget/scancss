import { cssAtRules } from '../cssAtRules';
import { cssAtRulesWithDeclarations } from '../cssAtRulesWithDeclarations';
import { difference } from '../../converters/difference';

export const cssAtRulesWithoutDeclarations = difference(cssAtRules, cssAtRulesWithDeclarations);
