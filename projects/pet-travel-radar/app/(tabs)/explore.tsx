import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const apiFields = [
  '장소명, 분류, 주소',
  '반려동물 동반 조건',
  '좌표 기반 거리 계산',
  '영업 상태와 추천 태그',
];

const nextSteps = [
  '한국관광공사 반려동물 동반 여행 API 연결',
  '실제 GPS 권한과 현재 위치 추적 적용',
  '지도 SDK 또는 AR 카메라 뷰로 표현 확장',
  '코스 저장, 팀원 공유, 이동 기록 기능 추가',
];

export default function TabTwoScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <MaterialCommunityIcons name="paw" size={34} color="#ffffff" />
        </View>
        <Text style={styles.eyebrow}>Contest Demo</Text>
        <Text style={styles.title}>반려동물 관광 데이터를 움직이는 경험으로</Text>
        <Text style={styles.description}>
          한국관광공사 API의 장소 데이터를 사용자의 현재 위치와 반경 스캔 경험으로 바꾸는
          프로토타입입니다.
        </Text>
      </View>

      <InfoCard
        icon="analytics"
        title="목데이터로 검증하는 가치"
        body="회의 전에는 실제 API 키 없이도 장소명, 좌표, 반려동물 동반 조건, 추천 태그를 목데이터로 구성해 앱 흐름을 검증할 수 있습니다."
      />

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>API로 교체할 필드</Text>
        {apiFields.map((item) => (
          <View key={item} style={styles.listRow}>
            <Ionicons name="checkmark-circle" size={19} color="#2f7d68" />
            <Text style={styles.listText}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>다음 구현 단계</Text>
        {nextSteps.map((item, index) => (
          <View key={item} style={styles.stepRow}>
            <Text style={styles.stepNumber}>{index + 1}</Text>
            <Text style={styles.listText}>{item}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function InfoCard({ icon, title, body }: { icon: keyof typeof Ionicons.glyphMap; title: string; body: string }) {
  return (
    <View style={styles.infoCard}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={22} color="#2f7d68" />
      </View>
      <View style={styles.infoCopy}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoBody}>{body}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#f7f3eb',
    flex: 1,
  },
  content: {
    padding: 18,
    paddingTop: 58,
  },
  hero: {
    backgroundColor: '#243b35',
    borderRadius: 8,
    padding: 20,
  },
  heroIcon: {
    alignItems: 'center',
    backgroundColor: '#e95f44',
    borderRadius: 8,
    height: 58,
    justifyContent: 'center',
    marginBottom: 18,
    width: 58,
  },
  eyebrow: {
    color: '#9fd8c9',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  title: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: '900',
    lineHeight: 32,
    marginTop: 8,
  },
  description: {
    color: '#d5e4df',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
  },
  infoCard: {
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderColor: '#eadfcf',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
    padding: 16,
  },
  infoIcon: {
    alignItems: 'center',
    backgroundColor: '#edf5ee',
    borderRadius: 8,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  infoCopy: {
    flex: 1,
  },
  infoTitle: {
    color: '#1d2b2f',
    fontSize: 17,
    fontWeight: '900',
  },
  infoBody: {
    color: '#5d6b6d',
    lineHeight: 21,
    marginTop: 6,
  },
  panel: {
    backgroundColor: '#ffffff',
    borderColor: '#eadfcf',
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 14,
    padding: 16,
  },
  panelTitle: {
    color: '#1d2b2f',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 12,
  },
  listRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 9,
    marginBottom: 10,
  },
  listText: {
    color: '#384846',
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
  },
  stepRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  stepNumber: {
    backgroundColor: '#f3efe5',
    borderRadius: 999,
    color: '#2f7d68',
    fontSize: 13,
    fontWeight: '900',
    height: 28,
    lineHeight: 28,
    textAlign: 'center',
    width: 28,
  },
});
