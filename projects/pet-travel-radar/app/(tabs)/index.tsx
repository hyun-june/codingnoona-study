import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PetTravelPlace, petTravelPlaces, scanRadiusM } from '@/data/petTravelPlaces';

export default function HomeScreen() {
  const [step, setStep] = useState(0);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const places = useMemo(
    () =>
      petTravelPlaces.map((place) => ({
        ...place,
        distanceM: Math.max(60, place.distanceM - step * 95),
      })),
    [step]
  );
  const nearbyPlaces = places.filter((place) => place.distanceM <= scanRadiusM);
  const recommendedPlace = nearbyPlaces[0] ?? places[0];
  const selectedPlace = places.find((place) => place.id === selectedPlaceId);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>Pet Travel Radar</Text>
          <Text style={styles.title}>반려동물 동반 여행 스캔</Text>
        </View>
        <View style={styles.statusPill}>
          <View style={styles.liveDot} />
          <Text style={styles.statusText}>Demo GPS</Text>
        </View>
      </View>

      <View style={styles.radarPanel}>
        <View style={styles.mapRoadOne} />
        <View style={styles.mapRoadTwo} />
        <View style={[styles.scanRing, styles.scanRingOuter]} />
        <View style={[styles.scanRing, styles.scanRingMiddle]} />
        <View style={[styles.scanRing, styles.scanRingInner]} />

        {places.map((place) => (
          <PlaceMarker
            key={place.id}
            place={place}
            active={place.distanceM <= scanRadiusM}
            selected={place.id === selectedPlaceId}
            onPress={() => setSelectedPlaceId(place.id)}
          />
        ))}

        <View style={styles.userMarker}>
          <MaterialCommunityIcons name="dog-side" size={30} color="#fdf7ed" />
        </View>
        <Text style={styles.radiusLabel}>탐색 반경 {scanRadiusM}m</Text>
      </View>

      <View style={styles.controls}>
        <Pressable
          style={({ pressed }) => [styles.controlButton, pressed && styles.pressed]}
          onPress={() => setStep((value) => Math.max(0, value - 1))}>
          <Ionicons name="chevron-back" size={18} color="#263238" />
          <Text style={styles.controlText}>이전 위치</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
          onPress={() => setStep((value) => (value + 1) % 5)}>
          <Ionicons name="navigate" size={18} color="#ffffff" />
          <Text style={styles.primaryText}>앞으로 이동</Text>
        </Pressable>
      </View>

      <View style={styles.insightRow}>
        <Metric label="반경 내" value={`${nearbyPlaces.length}곳`} />
        <Metric label="추천" value={recommendedPlace.category} />
        <Metric label="최근접" value={`${recommendedPlace.distanceM}m`} />
      </View>

      <ScrollView style={styles.feed} showsVerticalScrollIndicator={false}>
        <RecommendationCard place={recommendedPlace} onPress={() => setSelectedPlaceId(recommendedPlace.id)} />
        <Text style={styles.sectionTitle}>주변 감지 목록</Text>
        {places.map((place) => (
          <PlaceRow key={place.id} place={place} onPress={() => setSelectedPlaceId(place.id)} />
        ))}
      </ScrollView>

      {selectedPlace ? (
        <PlaceDetailSheet place={selectedPlace} onClose={() => setSelectedPlaceId(null)} />
      ) : null}
    </View>
  );
}

function PlaceMarker({
  place,
  active,
  selected,
  onPress,
}: {
  place: PetTravelPlace;
  active: boolean;
  selected: boolean;
  onPress: () => void;
}) {
  const distanceRatio = Math.min(place.distanceM / 820, 1);
  const angle = (place.bearingDeg * Math.PI) / 180;
  const radius = 118 * distanceRatio;
  const x = Math.sin(angle) * radius;
  const y = -Math.cos(angle) * radius;

  return (
    <Pressable
      style={[
        styles.placeMarker,
        active ? styles.placeMarkerActive : styles.placeMarkerIdle,
        selected && styles.placeMarkerSelected,
        {
          transform: [{ translateX: x }, { translateY: y }],
        },
      ]}
      onPress={onPress}>
      <MaterialCommunityIcons
        name={categoryIcon(place.category)}
        size={18}
        color={active ? '#ffffff' : '#4b5f68'}
      />
    </Pressable>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

function RecommendationCard({ place, onPress }: { place: PetTravelPlace; onPress: () => void }) {
  return (
    <Pressable style={({ pressed }) => [styles.recommendCard, pressed && styles.pressed]} onPress={onPress}>
      <View style={styles.recommendHeader}>
        <View style={styles.recommendIcon}>
          <MaterialCommunityIcons name={categoryIcon(place.category)} size={24} color="#ffffff" />
        </View>
        <View style={styles.recommendCopy}>
          <Text style={styles.recommendLabel}>반경 안에 들어왔어요</Text>
          <Text style={styles.recommendTitle}>{place.name}</Text>
        </View>
        <Text style={styles.distance}>{place.distanceM}m</Text>
      </View>
      <Text style={styles.policy}>{place.petPolicy}</Text>
      <Text style={styles.tip}>{place.tip}</Text>
      <View style={styles.tagRow}>
        {place.tags.map((tag) => (
          <Text key={tag} style={styles.tag}>
            {tag}
          </Text>
        ))}
      </View>
    </Pressable>
  );
}

function PlaceRow({ place, onPress }: { place: PetTravelPlace; onPress: () => void }) {
  const active = place.distanceM <= scanRadiusM;

  return (
    <Pressable style={({ pressed }) => [styles.placeRow, pressed && styles.pressed]} onPress={onPress}>
      <View style={[styles.rowIcon, active && styles.rowIconActive]}>
        <MaterialCommunityIcons
          name={categoryIcon(place.category)}
          size={20}
          color={active ? '#ffffff' : '#546e7a'}
        />
      </View>
      <View style={styles.rowCopy}>
        <Text style={styles.rowTitle}>{place.name}</Text>
        <Text style={styles.rowMeta}>
          {place.address} · {place.openNow ? '운영 중' : '영업 전'}
        </Text>
      </View>
      <Text style={[styles.rowDistance, active && styles.rowDistanceActive]}>{place.distanceM}m</Text>
    </Pressable>
  );
}

function PlaceDetailSheet({ place, onClose }: { place: PetTravelPlace; onClose: () => void }) {
  return (
    <View style={styles.sheet}>
      <View style={styles.sheetHandle} />
      <View style={styles.sheetHeader}>
        <View style={styles.sheetIcon}>
          <MaterialCommunityIcons name={categoryIcon(place.category)} size={25} color="#ffffff" />
        </View>
        <View style={styles.sheetTitleBlock}>
          <Text style={styles.sheetLabel}>선택한 장소</Text>
          <Text style={styles.sheetTitle}>{place.name}</Text>
        </View>
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={20} color="#31413e" />
        </Pressable>
      </View>

      <View style={styles.sheetStats}>
        <View style={styles.sheetStat}>
          <Text style={styles.sheetStatLabel}>거리</Text>
          <Text style={styles.sheetStatValue}>{place.distanceM}m</Text>
        </View>
        <View style={styles.sheetStat}>
          <Text style={styles.sheetStatLabel}>운영</Text>
          <Text style={styles.sheetStatValue}>{place.openNow ? '가능' : '전'}</Text>
        </View>
        <View style={styles.sheetStat}>
          <Text style={styles.sheetStatLabel}>분류</Text>
          <Text style={styles.sheetStatValue}>{place.category}</Text>
        </View>
      </View>

      <View style={styles.detailLine}>
        <Ionicons name="location" size={18} color="#2f7d68" />
        <Text style={styles.detailText}>{place.address}</Text>
      </View>
      <View style={styles.detailLine}>
        <MaterialCommunityIcons name="paw" size={18} color="#2f7d68" />
        <Text style={styles.detailText}>{place.petPolicy}</Text>
      </View>
      <Text style={styles.sheetTip}>{place.tip}</Text>

      <View style={styles.tagRow}>
        {place.tags.map((tag) => (
          <Text key={tag} style={styles.tag}>
            {tag}
          </Text>
        ))}
      </View>
    </View>
  );
}

function categoryIcon(category: PetTravelPlace['category']) {
  switch (category) {
    case 'Cafe':
      return 'coffee';
    case 'Walk':
      return 'walk';
    case 'Stay':
      return 'bed';
    case 'Food':
      return 'silverware-fork-knife';
    case 'Tour':
    default:
      return 'map-marker-star';
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f7f3eb',
    paddingHorizontal: 18,
    paddingTop: 58,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  eyebrow: {
    color: '#487264',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  title: {
    color: '#1d2b2f',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 4,
  },
  statusPill: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#dce5dd',
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  liveDot: {
    backgroundColor: '#22a06b',
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  statusText: {
    color: '#263238',
    fontSize: 12,
    fontWeight: '800',
  },
  radarPanel: {
    alignItems: 'center',
    aspectRatio: 1,
    backgroundColor: '#dfe9dc',
    borderColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 4,
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 18,
  },
  mapRoadOne: {
    backgroundColor: '#f8faf5',
    height: 34,
    opacity: 0.78,
    position: 'absolute',
    transform: [{ rotate: '-22deg' }],
    width: 420,
  },
  mapRoadTwo: {
    backgroundColor: '#c8d9d2',
    height: 26,
    opacity: 0.82,
    position: 'absolute',
    transform: [{ rotate: '52deg' }],
    width: 390,
  },
  scanRing: {
    borderColor: '#2e7d6b',
    borderRadius: 999,
    borderWidth: 1,
    opacity: 0.3,
    position: 'absolute',
  },
  scanRingOuter: {
    height: '82%',
    width: '82%',
  },
  scanRingMiddle: {
    height: '56%',
    width: '56%',
  },
  scanRingInner: {
    height: '30%',
    width: '30%',
  },
  userMarker: {
    alignItems: 'center',
    backgroundColor: '#243b35',
    borderColor: '#ffffff',
    borderRadius: 28,
    borderWidth: 3,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  radiusLabel: {
    backgroundColor: 'rgba(255, 255, 255, 0.86)',
    borderRadius: 999,
    bottom: 14,
    color: '#2d4a42',
    fontSize: 12,
    fontWeight: '800',
    paddingHorizontal: 12,
    paddingVertical: 7,
    position: 'absolute',
  },
  placeMarker: {
    alignItems: 'center',
    borderColor: '#ffffff',
    borderRadius: 18,
    borderWidth: 2,
    height: 36,
    justifyContent: 'center',
    left: '50%',
    marginLeft: -18,
    marginTop: -18,
    position: 'absolute',
    top: '50%',
    width: 36,
  },
  placeMarkerActive: {
    backgroundColor: '#e95f44',
  },
  placeMarkerIdle: {
    backgroundColor: '#eef5ef',
  },
  placeMarkerSelected: {
    borderColor: '#243b35',
    borderWidth: 3,
  },
  controls: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  controlButton: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#dfe8df',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    paddingVertical: 13,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#2f7d68',
    borderRadius: 8,
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    paddingVertical: 13,
  },
  pressed: {
    opacity: 0.72,
  },
  controlText: {
    color: '#263238',
    fontWeight: '900',
  },
  primaryText: {
    color: '#ffffff',
    fontWeight: '900',
  },
  insightRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  metricCard: {
    backgroundColor: '#ffffff',
    borderColor: '#e5e0d7',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    padding: 12,
  },
  metricLabel: {
    color: '#6f7f78',
    fontSize: 12,
    fontWeight: '800',
  },
  metricValue: {
    color: '#1e302d',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 2,
  },
  feed: {
    marginTop: 12,
  },
  recommendCard: {
    backgroundColor: '#ffffff',
    borderColor: '#eadfcf',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  recommendHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  recommendIcon: {
    alignItems: 'center',
    backgroundColor: '#e95f44',
    borderRadius: 8,
    height: 46,
    justifyContent: 'center',
    width: 46,
  },
  recommendCopy: {
    flex: 1,
  },
  recommendLabel: {
    color: '#e95f44',
    fontSize: 12,
    fontWeight: '900',
  },
  recommendTitle: {
    color: '#1d2b2f',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 2,
  },
  distance: {
    color: '#2f7d68',
    fontSize: 16,
    fontWeight: '900',
  },
  policy: {
    color: '#2d3b3f',
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 21,
    marginTop: 14,
  },
  tip: {
    color: '#5d6b6d',
    lineHeight: 20,
    marginTop: 8,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  tag: {
    backgroundColor: '#f3efe5',
    borderRadius: 999,
    color: '#4e625d',
    fontSize: 12,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  sectionTitle: {
    color: '#24322f',
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 10,
    marginTop: 18,
  },
  placeRow: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 9,
    padding: 12,
  },
  rowIcon: {
    alignItems: 'center',
    backgroundColor: '#edf2ee',
    borderRadius: 8,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  rowIconActive: {
    backgroundColor: '#2f7d68',
  },
  rowCopy: {
    flex: 1,
  },
  rowTitle: {
    color: '#22312f',
    fontSize: 15,
    fontWeight: '900',
  },
  rowMeta: {
    color: '#72807c',
    fontSize: 12,
    marginTop: 3,
  },
  rowDistance: {
    color: '#8a9692',
    fontWeight: '900',
  },
  rowDistanceActive: {
    color: '#e95f44',
  },
  sheet: {
    backgroundColor: '#ffffff',
    borderColor: '#e9dfd2',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 1,
    bottom: 0,
    left: 0,
    paddingBottom: 26,
    paddingHorizontal: 18,
    paddingTop: 10,
    position: 'absolute',
    right: 0,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 22,
  },
  sheetHandle: {
    alignSelf: 'center',
    backgroundColor: '#d7ddd8',
    borderRadius: 999,
    height: 4,
    marginBottom: 14,
    width: 42,
  },
  sheetHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  sheetIcon: {
    alignItems: 'center',
    backgroundColor: '#2f7d68',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  sheetTitleBlock: {
    flex: 1,
  },
  sheetLabel: {
    color: '#e95f44',
    fontSize: 12,
    fontWeight: '900',
  },
  sheetTitle: {
    color: '#1d2b2f',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 2,
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: '#f1f4f1',
    borderRadius: 8,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  sheetStats: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  sheetStat: {
    backgroundColor: '#f7f3eb',
    borderRadius: 8,
    flex: 1,
    padding: 10,
  },
  sheetStatLabel: {
    color: '#77837f',
    fontSize: 12,
    fontWeight: '800',
  },
  sheetStatValue: {
    color: '#24322f',
    fontSize: 16,
    fontWeight: '900',
    marginTop: 2,
  },
  detailLine: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  detailText: {
    color: '#354744',
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  sheetTip: {
    color: '#5d6b6d',
    lineHeight: 20,
    marginTop: 12,
  },
});
