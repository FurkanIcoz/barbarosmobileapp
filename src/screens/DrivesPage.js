import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRideHistory } from '../redux/ridesSlice';
import { Loading } from '../components';
import { doc, getDoc, getFirestore } from 'firebase/firestore'; // Firestore metodları

const Header = ({ registrationDate, totalAmount, totalDuration }) => {
  const registrationMonthYear = registrationDate ? `${registrationDate.toLocaleString('tr-TR', { month: 'long' })} ${registrationDate.getFullYear()}` : '';

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.welcomeText}>{registrationMonthYear}</Text>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Toplam Ödeme:</Text>
          <Text style={styles.summaryValue}>{totalAmount} TL</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Toplam Süre:</Text>
          <Text style={styles.summaryValue}>{totalDuration} dk</Text>
        </View>
      </View>
    </View>
  );
};

const DrivesPage = () => {
  const dispatch = useDispatch();
  const { rideHistory, isLoading, error } = useSelector((state) => state.rides);
  const user = useSelector((state) => state.user.user);
  const [registrationDate, setRegistrationDate] = useState(null);

  useEffect(() => {
    dispatch(fetchRideHistory());
    const fetchUserRegistrationDate = async () => {
      try {
        const db = getFirestore();
        const userDoc = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
          const data = userSnap.data();
          // Tarih verisini Date nesnesine dönüştür
          const createdAt = data.createdAt;
          if (createdAt instanceof Date) {
            setRegistrationDate(createdAt);
          } else if (typeof createdAt === 'string') {
            setRegistrationDate(new Date(createdAt));
          } else {
            console.error('createdAt is not a Date or string');
          }
        }
      } catch (err) {
        console.error('Kullanıcı kayıt tarihi alınırken bir hata oluştu:', err);
      }
    };
    fetchUserRegistrationDate();
  }, [dispatch, user.uid]);

  const totalAmount = rideHistory.reduce((sum, item) => item.userId === user.uid ? sum + item.price : sum, 0);
  const totalDuration = rideHistory.reduce((sum, item) => item.userId === user.uid ? sum + parseFloat(item.duration) : sum, 0);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Bir hata oluştu: {error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    item.userId === user.uid && (
      <View style={styles.itemContainer}>
        <View style={styles.infoContainer}>
          <View>
            <View style={styles.dateClock}>
              <Text style={styles.durationText}>Tarih: </Text>
              <Text style={styles.dateText}>{item.date} </Text>
            </View>
            <View style={styles.dateClock}>
              <Text style={styles.durationText}>Saat: </Text>
              <Text style={styles.dateText}> 11.00 - 12.00</Text>
            </View>
            <View style={styles.dateClock}>
              <Text style={styles.durationText}>Süre: </Text>
              <Text style={styles.dateText}>{item.duration}</Text>
            </View>
          </View>
          <View>
            <Text>Tutar</Text>
            <Text style={styles.amountText}>{item.price} TL</Text>
          </View>
        </View>
      </View>
    )
  );

  return (
    <View style={styles.container}>
      <Header registrationDate={registrationDate} totalAmount={totalAmount} totalDuration={totalDuration} />
      <FlatList
        data={rideHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryItem: {
    backgroundColor: '#3386FF',
    borderRadius: 50,
    padding: 10,
    margin: 5,
    width: 100,
    alignItems: 'center',
  },
  summaryLabel: {
    color: '#fff',
    fontSize: 12,
  },
  summaryValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  dateClock: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  durationText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#000',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default DrivesPage;
