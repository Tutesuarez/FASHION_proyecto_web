let ourProductsItems=[
    {id: 0,cantidad:1,categoria:'woman',img:'asset/img/pr-01.png',nombre:'Perfume',precio:250},
    {id: 1,cantidad:1,categoria:'woman',img:'asset/img/pr-02.png',nombre:'Handbags',precio:550},
    {id: 2,cantidad:1,categoria:'woman',img:'asset/img/pr-03.png',nombre:'Lipsticks',precio:150},
    {id: 3,cantidad:1,categoria:'woman',img:'asset/img/pr-04.png',nombre:'Watches',precio:600},
    {id: 4,cantidad:1,categoria:'woman',img:'asset/img/pr-05.png',nombre:'Brushes',precio:70},
    {id: 5,cantidad:1,categoria:'woman',img:'asset/img/pr-06.png',nombre:'Sunglasess',precio:300},
    {id: 6,cantidad:1,categoria:'woman',img:'asset/img/pr-07.png',nombre:'Shoes',precio:350},
    {id: 7,cantidad:1,categoria:'woman',img:'asset/img/pr-08.png',nombre:'Jyeweller',precio:800},
    {id: 8,cantidad:1,categoria:'man',img:'asset/img/man-belts.png',nombre:'Belts',precio:250},
    {id: 9,cantidad:1,categoria:'man',img:'asset/img/man-caps.png',nombre:'Caps',precio:100},
    {id: 10,cantidad:1,categoria:'man',img:'asset/img/man-shoes.png',nombre:'Shoes',precio:500},
    {id: 11,cantidad:1,categoria:'man',img:'asset/img/man-long-sleeves.png',nombre:'Sleeves',precio:600},
    {id: 12,cantidad:1,categoria:'man',img:'asset/img/man-t-shirt.png',nombre:'T-Shirts',precio:70},
    {id: 13,cantidad:1,categoria:'man',img:'asset/img/man-sunglasses.png',nombre:'Sunglasess',precio:230},
    {id: 14,cantidad:1,categoria:'man',img:'asset/img/man-watches.png',nombre:'Watches',precio:800},
    {id: 15,cantidad:1,categoria:'man',img:'asset/img/man-wallet.png',nombre:'Wallets',precio:150}
];

let basket=[];
let products=[];

savingStorage1();

function savingStorage1() {
    localStorage.setItem("products",JSON.stringify(ourProductsItems));
}
