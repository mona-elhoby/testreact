export const monthLabels = (fullChart, durationType) => fullChart?.map((c, i) => {
    return durationType == 'monthly'
        ? c._DATE?.split('-')?.slice(0, 1).toString() == '1'
            ? 'Jan'
            : c._DATE?.split('-')?.slice(0, 1).toString() == '2'
            ? 'Feb'
            : c._DATE?.split('-')?.slice(0, 1).toString() == '3'
            ? 'Mar'
            : c._DATE?.split('-')?.slice(0, 1).toString() == '4'
            ? 'Apr'
            : c._DATE?.split('-')?.slice(0, 1).toString() == '5'
            ? 'May'
            : c._DATE?.split('-')?.slice(0, 1).toString() == '6'
            ? 'Jun'
            : c._DATE?.split('-')?.slice(0, 1).toString() == '7'
            ? 'Jul'
            : c._DATE?.split('-')?.slice(0, 1).toString() == '8'
            ? 'Aug'
            : c._DATE?.split('-')?.slice(0, 1).toString() == '9'
            ? 'Sep'
            : c._DATE?.split('-')?.slice(0, 1).toString() == '10'
            ? 'Oct'
            : c._DATE?.split('-')?.slice(0, 1).toString() == '11'
            ? 'Nov'
            : c._DATE?.split('-')?.slice(0, 1).toString() == '12'
            ? 'Dec'
            : null
        : durationType == 'all'
        ? // ? c._DATE?.split('-')?.slice(2).toString()
        typeof c._NAME != 'object' ? c._NAME.split('-') : c._NAME
        : c._DATE;
});