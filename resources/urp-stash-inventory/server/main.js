import Core from 'urp-core';
import * as alt from 'alt-server';

alt.onClient('stash:inventory:dataRequest:vehicle', async (source, vehicle) => {
    Core.Inventory.getVehicleInventory(source, vehicle);
});

alt.onClient(
    'stash:inventory:transferChest',
    (source, item, amount, chestType) => {
        console.log('stash:inventory:transferChest', item, amount, chestType);
        switch (chestType) {
            case 'home':
                if (Core.Inventory.removeItem(source, item, amount)) {
                    Core.Inventory.transferChest(source, item, amount);
                }
                break;
            case 'chest':
                if (Core.Inventory.removeItem(source, item, amount)) {
                    Core.Inventory.transferChest(source, item, amount);
                }
                break;
            case 'vehicle':
                if (Core.Inventory.removeItem(source, item, amount)) {
                    Core.Inventory.transferVehicle(source, item, amount);
                }
                break;
            default:
                break;
        }
    }
);

alt.onClient(
    'stash:inventory:transferInventory',
    (source, item, amount, chestType) => {
        switch (chestType) {
            case 'home':
                if (Core.Inventory.removeItemChest(source, item, amount)) {
                    Core.Inventory.addItem(source, item, amount);
                }
                break;
            case 'chest':
                if (Core.Inventory.removeItemChest(source, item, amount)) {
                    Core.Inventory.addItem(source, item, amount);
                }
                break;
            case 'vehicle':
                if (Core.Inventory.removeItemVehicle(source, item, amount)) {
                    Core.Inventory.addItem(source, item, amount);
                }
                break;
            default:
                break;
        }
    }
);
alt.onClient('inventory:requestHomeInventory', (source) => {
    Core.Inventory.getHomeInventory(source);
});
