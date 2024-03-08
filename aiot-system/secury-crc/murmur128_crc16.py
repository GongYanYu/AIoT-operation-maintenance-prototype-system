import mmh3

def murmur128_crc16_combine(data):
  # 使用MurmurHash3_x86_128算法计算哈希值
  hash_values = mmh3.hash128(data)

  # 取MurmurHash3_x86_128结果的一部分作为整数
  murmur_part = hash_values[0]

  # 计算CRC-16
  crc16 = calculate_crc16(data)

  # 结合MurmurHash和CRC-16的结果
  combined_result = murmur_part ^ crc16

  return combined_result

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

# 示例数据
data_to_combine = b"Hello, MurmurHash128 and CRC-16!"

# 计算结合结果
result_combined = murmur128_crc16_combine(data_to_combine)

# 打印结果
print(f"Combined Result: {result_combined}")
