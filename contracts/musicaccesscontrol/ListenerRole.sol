pragma solidity ^0.4.24;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'ListenerRole' to manage this role - add, remove, check
contract ListenerRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event ListenerAdded(address indexed account);
  event ListenerRemoved(address indexed account);

  // Define a struct 'listeners' by inheriting from 'Roles' library, struct Role
  Roles.Role private listeners;

  // In the constructor make the address that deploys this contract the 1st farmer
  constructor() public {
    _addListener(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyListener() {
    require(isListener(msg.sender),'Only listeners may call this function');
    _;
  }

  // Define a function 'isListener' to check this role
  function isListener(address account) public view returns (bool) {
    return listeners.has(account);
  }

  // Define a function 'addListener' that adds this role
  function addListener(address account) public onlyListener {
    _addListener(account);
  }

  // Define a function 'renounceListener' to renounce this role
  function renounceListener() public {
    _removeListener(msg.sender);
  }

  // Define an internal function '_addListener' to add this role, called by 'addListener'
  function _addListener(address account) internal {
    listeners.add(account);
    emit ListenerAdded(account);
  }

  // Define an internal function '_removeListener' to remove this role, called by 'removeListener'
  function _removeListener(address account) internal {
    listeners.remove(account);
    emit ListenerRemoved(account);
  }
}