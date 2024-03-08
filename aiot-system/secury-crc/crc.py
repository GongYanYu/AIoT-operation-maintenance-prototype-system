def calculate_crc16(data):
    # CRC-16多项式
    polynomial = 0x8005
    # 初始值
    crc = 0xFFFF

    # 遍历数据
    for byte in data:
        crc ^= (byte << 8)  # 将当前字节左移8位与CRC异或
        for _ in range(8):
            if crc & 0x8000:  # 检查CRC最高位
                crc = (crc << 1) ^ polynomial
            else:
                crc <<= 1

    return crc & 0xFFFF  # 返回16位CRC值

# 示例二进制数据（假设每个字节都是8位）
binary_data = [
    0b01001000,  # 字节1: 0x48
    0b01100101,  # 字节2: 0x65
    0b01101100,  # 字节3: 0x6C
    0b01101100,  # 字节4: 0x6C
    0b01101111,  # 字节5: 0x6F
    0b00101100,  # 字节6: 0x2C
    0b01101111,  # 字节5: 0x6F
    0b00101100   # 字节6: 0x2C
]

# 计算CRC-16校验和
crc16_checksum = calculate_crc16(binary_data)

# 打印结果
print(f"CRC-16 校验和: {crc16_checksum:04X}")
