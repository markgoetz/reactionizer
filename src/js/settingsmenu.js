var SettingsMenu = React.createClass({
	displayName: "SettingsMenu",

	propTypes: {
		conferences: React.PropTypes.number,
		divisions: React.PropTypes.number,
		teams: React.PropTypes.array,
		cities: React.PropTypes.array,
		onConferenceChange: React.PropTypes.func
	},
	getInitialState: function () {
		return { menu_open: false };
	},
	render: function () {
		var menu_class = this.state.menu_open ? "open" : "closed";
		var button_label = this.state.menu_open ? "close" : "open";

		return React.createElement(
			"div",
			{ id: "settings_container" },
			React.createElement(
				"h2",
				{ id: "settings_header" },
				React.createElement(
					"span",
					null,
					"Settings"
				),
				React.createElement(
					"button",
					{ onClick: this.toggleMenu },
					button_label
				)
			),
			React.createElement(
				"div",
				{ id: "settings_menu", className: menu_class },
				React.createElement(ConferenceSelector, { conferences: this.props.conferences, divisions: this.props.divisions, onConferenceChange: this.onConferenceChange }),
				React.createElement(Relocationizer, { teams: this.props.teams, cities: this.props.cities })
			)
		);
	},
	onConferenceChange: function (c, d) {
		this.props.onConferenceChange(c, d);
	},
	toggleMenu: function () {
		this.setState({ menu_open: !this.state.menu_open });
	}
});

var ConferenceSelector = React.createClass({
	displayName: "ConferenceSelector",

	propTypes: {
		conferences: React.PropTypes.number,
		divisions: React.PropTypes.number,
		onConferenceChange: React.PropTypes.func
	},
	getInitialState: function () {
		return { conferences: this.props.conferences, divisions: this.props.divisions };
	},
	render: function () {
		var conference_nodes = [3, 2, 1].map(function (conference) {
			return React.createElement(SelectorButton, {
				type: "conference",
				key: "conference" + conference,
				value: conference,
				selected: conference == this.state.conferences,
				disabled: false,
				onButtonClick: this.conferenceUpdate });
		}, this);
		var division_nodes = [6, 4, 3, 2].map(function (division) {
			return React.createElement(SelectorButton, {
				type: "division",
				key: "division" + division,
				value: division,
				selected: division == this.state.divisions,
				disabled: division % this.state.conferences != 0,
				onButtonClick: this.divisionUpdate });
		}, this);

		return React.createElement(
			"div",
			null,
			React.createElement(
				"div",
				{ className: "field" },
				React.createElement(
					"h3",
					null,
					"Conferences"
				),
				React.createElement(
					"div",
					{ className: "subfield" },
					React.createElement(
						"div",
						{ className: "selector-container" },
						conference_nodes
					)
				)
			),
			React.createElement(
				"div",
				{ className: "field" },
				React.createElement(
					"h3",
					null,
					"Divisions"
				),
				React.createElement(
					"div",
					{ className: "subfield" },
					React.createElement(
						"div",
						{ className: "selector-container" },
						division_nodes
					)
				)
			)
		);
	},
	conferenceUpdate: function (c) {
		this.setState({ conferences: c });
		var d = this.state.divisions;

		if (this.state.divisions % c != 0) {
			d = 6;
			this.setState({ divisions: d });
		}

		this.props.onConferenceChange(c, d);
	},
	divisionUpdate: function (d) {
		this.setState({ divisions: d });
		this.props.onConferenceChange(this.state.conferences, d);
	}
});

var SelectorButton = React.createClass({
	displayName: "SelectorButton",

	propTypes: {
		selected: React.PropTypes.bool,
		disabled: React.PropTypes.bool,
		type: React.PropTypes.string,
		value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		onButtonClick: React.PropTypes.func
	},
	render: function () {
		var className = "div_button selector " + (this.props.selected ? " selected" : "") + (this.props.disabled ? " disabled" : "");
		var id = this.props.type + "_count_selector_" + this.props.value;
		return React.createElement(
			"button",
			{
				className: className,
				id: id,
				disabled: this.props.disabled,
				onClick: this.handleClick },
			this.props.value
		);
	},
	handleClick: function () {
		this.props.onButtonClick(this.props.value);
	}
});

var Relocationizer = React.createClass({
	displayName: "Relocationizer",

	propTypes: {
		teams: React.PropTypes.array,
		cities: React.PropTypes.array
	},
	render: function () {
		var team_nodes = this.props.teams.map(function (team) {
			return React.createElement(
				"option",
				{ key: team.name },
				team.name
			);
		});

		var city_nodes = this.props.cities.map(function (city) {
			return React.createElement(
				"option",
				{ key: city.city },
				city.city
			);
		});

		return React.createElement(
			"div",
			null,
			React.createElement(
				"div",
				{ className: "field" },
				React.createElement(
					"h3",
					null,
					"Relocate team"
				),
				React.createElement(
					"div",
					{ className: "subfield" },
					React.createElement(
						"label",
						null,
						"team"
					),
					React.createElement(
						"select",
						null,
						team_nodes
					)
				),
				React.createElement(
					"div",
					{ className: "subfield" },
					React.createElement(
						"label",
						null,
						"to"
					),
					React.createElement(
						"select",
						null,
						city_nodes
					)
				),
				React.createElement(
					"div",
					null,
					React.createElement(
						"button",
						{ className: "action" },
						"Relocate Team"
					)
				)
			),
			React.createElement(
				"div",
				{ className: "field" },
				React.createElement(
					"h3",
					null,
					"Expansion team"
				),
				React.createElement(
					"div",
					{ className: "subfield" },
					React.createElement(
						"label",
						null,
						"city"
					),
					React.createElement(
						"select",
						null,
						city_nodes
					)
				),
				React.createElement(
					"div",
					{ className: "subfield" },
					React.createElement(
						"label",
						null,
						"name"
					),
					React.createElement("input", { type: "text" })
				),
				React.createElement(
					"div",
					null,
					React.createElement(
						"button",
						{ className: "action" },
						"Create Team"
					)
				)
			)
		);
	}
});
//# sourceMappingURL=settingsmenu.js.map
