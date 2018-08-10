import { cssEngineTriggerProperties } from '../../../constants/cssEngineTriggerProperties';

export function handleEngineTriggers(prop, report) {
	if (Object.keys(cssEngineTriggerProperties).includes(prop)) {
		const engineTriggers = cssEngineTriggerProperties[prop];

		Object
			.keys(engineTriggers)
			.forEach((engine) => {
				if (engineTriggers[engine].layout === true) {
					report.properties.engineTriggers.layout[engine]++;
				}
				if (engineTriggers[engine].paint === true) {
					report.properties.engineTriggers.paint[engine]++;
				}
				if (engineTriggers[engine].composite === true) {
					report.properties.engineTriggers.composite[engine]++;
				}
			});
	}
}
