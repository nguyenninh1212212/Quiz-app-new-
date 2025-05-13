import React from "react";
import { FlatList, ActivityIndicator, View } from "react-native";

const Paginator = ({
  page,
  setPage,
  renderItem,
  loading,
  loadingMore,
  data,
  hasMore,
}) => {
  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()} // Dùng id làm key
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : null
        }
      />
      {loading && !loadingMore && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};

export default Paginator;
