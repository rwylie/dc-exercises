export function addContact (id, data) {
  return {
    type: 'ADD_CONTACT',  //action that happens when adding a contact
    id: id,
    data: data    //when adding contact needs to supply id and data
  }
}

export function editContact (id, data) {
  return {
    type: 'EDIT_CONTACT',  //action that happens when adding a contact
    id: id,
    data: data    //when adding contact needs to supply id and data
  }
