import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Alert, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

// Mô phỏng dữ liệu câu hỏi
const QuizScreen = () => {
  const route = useRoute();
  const { id, quest } = route.params;
  const questions = quest;

  const navigation = useNavigation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    if (questions?.length) {
      setSelectedAnswers(Array(questions.length).fill([])); // Khởi tạo mảng các mảng rỗng
    }
  }, [questions]);

  const [timeLeft, setTimeLeft] = useState(questions?.length * 60); // 2 phút (120 giây)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (timeLeft === 0) {
      handleSubmit();
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerSelect = (option) => {
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const currentSelected = updatedAnswers[currentQuestion] || [];

      if (currentSelected.length >= questions[currentQuestion].correct.length) {
        return prevAnswers; // Nếu đã chọn đủ đáp án, không cho chọn thêm
      }

      updatedAnswers[currentQuestion] = [...currentSelected, option];
      return updatedAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const countCorrectAnswers = () => {
    return questions.filter((q, index) => {
      const selected = selectedAnswers[index] || [];
      return q.correct.every((answer) => selected.includes(answer)) && selected.length === q.correct.length;
    }).length;
  };

  const handleSubmit = () => {
    // Kiểm tra nếu còn câu chưa trả lời
    const unansweredQuestions = selectedAnswers.filter((answer) => answer.length === 0);

    if (unansweredQuestions.length > 0) {
      Alert.alert(
        "Chưa trả lời hết câu hỏi",
        "Bạn có chắc muốn nộp bài không?",
        [
          { text: "Hủy", style: "cancel" },
          { text: "Nộp bài", onPress: () => submitQuiz() },
        ]
      );
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = () => {
    const correctAnswers = countCorrectAnswers();
    const totalQuestions = questions.length;

    // Tính điểm dựa trên phần trăm cho mỗi câu hỏi
    const scorePerQuestion = 100 / totalQuestions;
    const score = Math.ceil(correctAnswers * scorePerQuestion); // Làm tròn lên điểm

    navigation.replace("Kết quả", {
      score: `${score}`,
      correctAnswers: `${correctAnswers}`,
      totalQuestions: `${totalQuestions}`,
      id: id,
    });
  };

  const handleNextQuestion = () => {
    // Không cần kiểm tra việc chọn đáp án trước khi chuyển câu
    handleNext();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#2a3164" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 16 }}>
        {/* Đồng hồ đếm và nút nộp bài */}
        <View
          style={{
            backgroundColor: "yellow",
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "black", fontWeight: "bold" }}>
            Thời gian: {Math.floor(timeLeft / 60)}p {timeLeft % 60}s
          </Text>
        </View>


      </View>

      {/* Bọc phần nội dung chính bằng ScrollView */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
          flexGrow: 1,
        }}
      >
        {/* Hiển thị câu hỏi hiện tại và các đáp án */}
        {questions.length > 0 && questions[currentQuestion] && (
          <>
            {/* Câu hỏi */}
            <View style={{ backgroundColor: "#4F6D7A", padding: 16, borderRadius: 8, marginTop: 16 }}>
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
                Câu {currentQuestion + 1}/{questions.length}: {questions[currentQuestion].question}
              </Text>
            </View>

            {/* Đáp án */}
            {questions[currentQuestion].answer.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion]?.includes(option);
              const isCorrect = questions[currentQuestion].correct.includes(option);
              const backgroundColor = isSelected
                ? isCorrect
                  ? "green"
                  : "red"
                : "#2E3A59"; // Màu mặc định
              const borderColor = isSelected
                ? isCorrect
                  ? "darkgreen"
                  : "darkred"
                : "#1C2A3D";

              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    marginTop: 12,
                    paddingVertical: 30,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    borderWidth: 2,
                    backgroundColor,
                    borderColor,
                  }}
                  onPress={() => handleAnswerSelect(option)}
                >
                  <Text style={{ color: "white", fontSize: 18 }}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </>
        )}

        {/* Nút điều hướng câu hỏi */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 24 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "blue",
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
              width: "48%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handlePrev}
            disabled={currentQuestion === 0}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>Câu trước</Text>
          </TouchableOpacity>

          {currentQuestion === questions.length - 1 ? (
            <TouchableOpacity
              style={{
                backgroundColor: "pink",
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
                width: "48%",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={handleSubmit}
            >
              <Text style={{ color: "white", fontWeight: "600" }}>Nộp bài</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "yellow",
                paddingHorizontal: 16,
                paddingVertical: 20,
                borderRadius: 8,
                width: "48%",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={handleNextQuestion}
            >
              <Text style={{ color: "black", fontWeight: "600" }}>Câu tiếp theo</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuizScreen;
