import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const PaginatedList = ({ data, page, limit, totalPage, onPageChange }) => {
  // Tính toán dữ liệu cần hiển thị dựa trên trang hiện tại và giới hạn
  const startIndex = page * limit;
  const endIndex = startIndex + limit;
  const currentData = data.slice(startIndex, endIndex);

  // Hàm chuyển trang
  const nextPage = () => {
    if (page < totalPage - 1) {
      onPageChange(page + 1); // Gọi hàm từ component cha để thay đổi page
    }
  };

  const prevPage = () => {
    if (page > 0) {
      onPageChange(page - 1); // Gọi hàm từ component cha để thay đổi page
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#f5f5f5' }}>
      <FlatList
        data={currentData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 16,
              marginBottom: 10,
              backgroundColor: '#fff',
              borderRadius: 8,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 5,
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            width: '48%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={prevPage}
          disabled={page === 0}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>Câu trước</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            width: '48%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={nextPage}
          disabled={page === totalPage - 1}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>Câu tiếp theo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaginatedList;
