SECTIONS="system interfaces staticroutes dhcpd dnsmasq snmpd syslog nat filter ipsec alias revision rrd widgets sysctl gateways openvpn cert ca virtualip vlans"

const MAPPING = {
    CONTROLLER_1: {
        UP: 'up',
        DOWN: 'down',
        LEFT: 'left',
        RIGHT: 'right',
        A: 'a',
        B: 'b',
        X: 'x',
        Y: 'y',
        LTRIG: 'l',
        RTRIG: 'r',
        SELECT: '-',
        START: '=',
    },
    CONTROLLER_2: {
        UP: 'numpad_8',
        DOWN: 'numpad_2',
        LEFT: 'numpad_4',
        RIGHT: 'numpad_6',
        A: 'numpad_7',
        B: 'numpad_9',
        X: 'numpad_1',
        Y: 'numpad_3',
        LTRIG: 'numpad_0',
        RTRIG: 'numpad_.',
        SELECT: '[',
        START: ']',
    },
};

module.exports = {
    INPUT,
};