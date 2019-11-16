App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",
    originMusicianID: "0x0000000000000000000000000000000000000000",
    originMusicianName: null,
    originMusicianInformation: null,
    songID: 0,
    songNotes: null,
    songPrice: 0,
    musicianShares: 100,
    producerShares: 0,
    distributorShares: 0,
    producerID: "0x0000000000000000000000000000000000000000",
    distributorID: "0x0000000000000000000000000000000000000000",
    listenerID: "0x0000000000000000000000000000000000000000",

    init: async function () {
        App.readForm();
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.ownerID = $("#ownerID").val();
        App.originMusicianID = $("#originMusicianID").val();
        App.originMusicianName = $("#originMusicianName").val();
        App.originMusicianInformation = $("#originMusicianInformation").val();
        App.songID = $("#songID").val();
        App.songNotes = $("#songNotes").val();
        App.songPrice = $("#songPrice").val();
        App.producerShares = $("#producerShares").val();
        App.distributorShares = $("#distributorShares").val();
        App.producerID = $("#producerID").val();
        App.distributorID = $("#distributorID").val();
        App.listenerID = $("#listenerID").val();

        console.log(
            App.sku,
            App.upc,
            App.ownerID, 
            App.originMusicianID, 
            App.originMusicianName, 
            App.originMusicianInformation, 
            App.songID, 
            App.songNotes, 
            App.songPrice, 
            App.musicianShares, 
            App.producerShares, 
            App.distributorShares, 
            App.producerID,
            App.distributorID,
            App.listenerID
        );
    },

    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }

        App.getMetaskAccountID();

        return App.initSupplyChain();
    },

    getMetaskAccountID: function () {
        web3 = new Web3(App.web3Provider);

        // Retrieving accounts
        web3.eth.getAccounts(function(err, res) {
            if (err) {
                console.log('Error:',err);
                return;
            }
            console.log('getMetaskID:',res);
            App.metamaskAccountID = res[0];

        })
    },

    initSupplyChain: function () {
        /// Source the truffle compiled smart contracts
        var jsonSupplyChain='../../build/contracts/SupplyChain.json';
        
        /// JSONfy the smart contracts
        $.getJSON(jsonSupplyChain, function(data) {
            console.log('data',data);
            var SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);
            
            App.fetchItemBufferOne();
            App.fetchItemBufferTwo();
            App.fetchEvents();

        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function(event) {
        event.preventDefault();

        App.getMetaskAccountID();

        var processId = parseInt($(event.target).data('id'));
        console.log('processId',processId);

        switch(processId) {
            case 1:
                return await App.writeMelody(event);
                break;
            case 2:
                return await App.writeLyrics(event);
                break;
            case 3:
                return await App.playTracks(event);
                break;
            case 4:
                return await App.recordTracks(event);
                break;
            case 5:
                return await App.approveTracks(event);
                break;
            case 6:
                return await App.releaseSong(event);
                break;
            case 7:
                return await App.receiveSong(event);
                break;
            case 8:
                return await App.purchaseSong(event);
                break;
            case 9:
                return await App.fetchItemBufferOne(event);
                break;
            case 10:
                return await App.fetchItemBufferTwo(event);
                break;
            }
    },

    writeMelody: function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.writeMelody(
                App.upc, 
                App.metamaskAccountID, 
                App.originMusicianName, 
                App.originMusicianInformation, 
                App.songNotes,
                {from: App.metamaskAccountID, gas: 2500000}
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('writeMelody',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    writeLyrics: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.writeLyrics(
                App.upc,
                {from: App.metamaskAccountID, gas: 2500000}
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('writeLyrics',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },
    
    playTracks: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            // const producerShares = 70;
            // console.log('producerShares',producerShares);
            return instance.playTracks(
                App.upc,
                App.producerShares,
                {from: App.metamaskAccountID, gas: 2500000}
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('playTracks',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    recordTracks: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.recordTracks(
                App.upc,
                {from: App.metamaskAccountID, gas: 2500000}
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('recordTracks',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    approveTracks: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.approveTracks(
                App.upc,
                {from: App.metamaskAccountID, gas: 2500000}
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('approveTracks',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    releaseSong: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            const songPrice = web3.toWei(1, "ether");
            const distributorShares = 40;
            console.log('songPrice',songPrice);
            console.log('distributorShares',distributorShares);
            return instance.releaseSong(
                App.upc,
                App.songPrice,
                App.distributorShares,
                {from: App.metamaskAccountID, gas: 2500000}
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('releaseSong',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    receiveSong: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.receiveSong(
                App.upc,
                {from: App.metamaskAccountID, gas: 2500000}
                );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('receiveSong',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    purchaseSong: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            const walletValue = web3.toWei(3, "ether");
            return instance.purchaseSong(
                App.upc,
                {from: App.metamaskAccountID, value: walletValue, gas: 2500000}
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('purchaseSong',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    fetchItemBufferOne: function () {
    ///   event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
        App.upc = $('#upc').val();
        console.log('upc',App.upc);

        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchSongBufferOne(App.upc);
        }).then(function(result) {
          $("#ftc-item").text(result);
          console.log('fetchItemBufferOne', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchItemBufferTwo: function () {
    ///    event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
                        
        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchSongBufferTwo.call(App.upc);
        }).then(function(result) {
          $("#ftc-item").text(result);
          console.log('fetchItemBufferTwo', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                App.contracts.SupplyChain.currentProvider,
                    arguments
              );
            };
        }

        App.contracts.SupplyChain.deployed().then(function(instance) {
        var events = instance.allEvents(function(err, log){
          if (!err)
            $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
        });
        }).catch(function(err) {
          console.log(err.message);
        });
        
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
