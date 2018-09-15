function amount_format(val){
    let s_length = val.length;
    let result = val;
    switch(s_length) {
        case 1:
            // 1
            result = val.substring(0, 1);
            break
        case 2:
            // 1.0
            result = val.substring(0, 1)+'.'+val.substring(1, 2);
            break;
        case 3:
            // 1.0
            result = val.substring(0, 1)+'.'+val.substring(1, 3);
            break;
        case 4:
            // 1'000
            result = val.substring(0, 1)+'\''+val.substring(1, 4);
            break;
        case 5:
            //1'000,0
            result = val.substring(0, 1)+'\''+val.substring(1, 4)+','+val.substring(4, 5);
            break;
        case 6:
            //1'000,00
            result = val.substring(0, 1)+'\''+val.substring(1, 4)+','+val.substring(4, 6);
            break;
        case 7:
            //10'000.00
            result = val.substring(0, 2)+'\''+val.substring(2, 5)+','+val.substring(5, 7);
            break;
        case 8:
            //100'000.00
            result = val.substring(0, 3)+'\''+val.substring(3, 6)+','+val.substring(6, 9);
            break;
        case 9:
            //1'000'000.00
            result = val.substring(0, 1)+'\''+val.substring(1, 4)+','+val.substring(4, 7)+'.'+val.substring(7, 9);
            break;
        case 10:
            //10'000'000.00
            result = val.substring(0, 2)+'\''+val.substring(2, 5)+','+val.substring(5, 8)+'.'+val.substring(8, 10);
            break;
        case 11:
            //100'000'000.00
            result = val.substring(0, 3)+'\''+val.substring(3, 6)+','+val.substring(6, 9)+'.'+val.substring(9, 11);
            break;
        default:
            //1'000'000'000.00
            result = val.substring(0, 1)+'\''+val.substring(1, 4)+','+val.substring(4, 7)+','+val.substring(7, 10)+'.'+val.substring(10, 12);
            break;
    }

    return result;
}


