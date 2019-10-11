const attributes = {
	mode: {
		source: 'attribute',
		selector: 'pre',
		attribute: 'data-mode',
		default: 'php'
	},
	theme: {
		source: 'attribute',
		selector: 'pre',
		attribute: 'data-theme',
		default: 'monokai'
	},
	fontsize: {
		source: 'attribute',
		selector: 'pre',
		attribute: 'data-fontsize',
		default: '14'
	},
	lines: {
		source: 'attribute',
		selector: 'pre',
		attribute: 'data-lines',
		default: 'Infinity'
	},
	code: {
		source: 'text',
		selector: 'pre',
		default: '<?php'
	},
	showLinesNumber: {
		type: 'boolean',
		default: true
	},
	allowCopy: {
		type: 'boolean',
		default: false
	},
	positionButtonX: {
		type: 'string',
		default: 0
	},
	positionButtonY: {
		type: 'string',
		default: 20
	},
};

export default attributes;
