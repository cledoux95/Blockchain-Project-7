pragma solidity ^0.4.24;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'MusicianRole' to manage this role - add, remove, check
contract MusicianRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event MusicianAdded(address indexed account);
  event MusicianRemoved(address indexed account);

  // Define a struct 'musicians' by inheriting from 'Roles' library, struct Role
  Roles.Role private musicians;

  // In the constructor make the address that deploys this contract the 1st farmer
  constructor() public {
    _addMusician(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyMusician() {
    require(isMusician(msg.sender),'Only musicians may call this function');
    _;
  }

  // Define a function 'isMusician' to check this role
  function isMusician(address account) public view returns (bool) {
    return musicians.has(account);
  }

  // Define a function 'addMusician' that adds this role
  function addMusician(address account) public onlyMusician {
    _addMusician(account);
  }

  // Define a function 'renounceMusician' to renounce this role
  function renounceMusician() public {
    _removeMusician(msg.sender);
  }

  // Define an internal function '_addMusician' to add this role, called by 'addMusician'
  function _addMusician(address account) internal {
    musicians.add(account);
    emit MusicianAdded(account);
  }

  // Define an internal function '_removeMusician' to remove this role, called by 'removeMusician'
  function _removeMusician(address account) internal {
    musicians.remove(account);
    emit MusicianRemoved(account);
  }
}