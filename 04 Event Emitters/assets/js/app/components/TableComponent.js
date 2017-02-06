(function ComponentInitializator($, React, App) {
  'use strict';

  var createCell = function (type, text) {
    return React.createElement(type, null, text);
  };

  var createRow = function (cell, index, contact) {
    return React.createElement('tr', { key: index },
      createCell(cell, contact.name),
      createCell(cell, contact.phone),
      createCell(cell, contact.email)
    );
  };

  var createThead = function () {
    var contactTemplate = {
      name: 'Name',
      phone: 'Phone number',
      email: 'Email'
    };
    return React.createElement('thead', null, createRow('th', null, contactTemplate));
  };

  var createTbody = function (contacts) {
    var rows = contacts.map(function (contact, index) {
      return createRow('td', index, contact);
    });
    return React.createElement('tbody', null, rows);
  };

  var TableComponent = React.createClass({
    onAddContact: function (contact) {
      this.setState({
        contacts: this.state.contacts.concat(contact)
      });
    },
    getInitialState: function () {
      return {
        contacts: []
      };
    },
    componentDidMount: function () {
      $.observe('addContacts').subscribe(this.onAddContact);
    },
    componentWillUnmount: function () {
      $.observe('addContacts').unsubscribe(this.onAddContact);
    },
    render: function () {
      return React.createElement('table',
        { className: 'table table-stripped table-bordered table-hover' },
        createThead(),
        createTbody(this.state.contacts)
      );
    },
  });

  App.components.TableComponent = TableComponent;
})(jQuery, React, window.App);
